import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { GoogleGenAI } from '@google/genai'
import { auth, currentUser } from '@clerk/nextjs/server'
import * as cheerio from 'cheerio'
import { validatePublicUrl } from '@/lib/ssrfGuard'
import { checkRateLimit } from '@/lib/rateLimit'

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

export async function POST(request: Request) {
  try {
    const supabase = await createClient()

    // 1. Authenticate user via Clerk
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Apply Rate Limiting
    const rateLimit = checkRateLimit(userId, 6, 60_000) // 6 req per minute
    if (!rateLimit.allowed) {
      return NextResponse.json({ error: 'Rate limit exceeded. Please try again in a minute.' }, { status: 429 })
    }

    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    // SSRF Prevention validation
    let safeUrlObj: URL
    try {
      safeUrlObj = await validatePublicUrl(url)
    } catch (e: any) {
      return NextResponse.json({ error: e.message || 'Invalid or unsafe URL.' }, { status: 400 })
    }
    const safeUrlString = safeUrlObj.toString()

    // 2. Fetch user data from Supabase or lazy create if new
    let { data: userData, error: userError } = await supabase
      .from('users')
      .select('plan, usage_count')
      .eq('id', userId)
      .single()

    if (!userData) {
      const user = await currentUser()
      const email = user?.primaryEmailAddress?.emailAddress
      
      if (!email) {
        return NextResponse.json({ error: 'User email not found' }, { status: 400 })
      }

      // Lazy insert for new Clerk users into Supabase
      const { data: newData, error: insertError } = await supabase
        .from('users')
        .insert({ id: userId, email: email, plan: 'free', usage_count: 0 })
        .select('plan, usage_count')
        .single()
        
      if (insertError || !newData) {
        return NextResponse.json({ error: 'Failed to initialize user data' }, { status: 500 })
      }
      userData = newData
    }

    // Usage limits per plan (messages per month)
    const usageLimits = {
      free: 60,
      starter: 500,
      pro: Infinity
    }

    // Message variants per lead per plan
    const variantLimits = {
      free: 1,
      starter: 3,
      pro: 4
    }

    const currentPlan = userData.plan as keyof typeof usageLimits
    const currentUsageLimit = usageLimits[currentPlan] || 60
    const variantCount = variantLimits[currentPlan] || 1

    if (userData.usage_count >= currentUsageLimit) {
      return NextResponse.json({ error: `Usage limit reached for ${userData.plan} plan. Please upgrade.` }, { status: 403 })
    }

    // 3. Scrape the URL
    console.log(`Scraping URL: ${safeUrlString}`)
    
    // Add a strict 5s timeout to fetch
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    let response: Response
    try {
      response = await fetch(safeUrlString, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; ReplyRocketBot/1.0; +http://replyrocket.io)',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        }
      })
      clearTimeout(timeoutId)
    } catch (e) {
      clearTimeout(timeoutId)
      return NextResponse.json({ error: 'Connection to website failed or timed out.' }, { status: 400 })
    }

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to access the provided URL' }, { status: 400 })
    }

    const html = await response.text()
    const $ = cheerio.load(html)

    // Remove scripts, styles, nav, footer to get core content
    $('script, style, noscript, nav, footer, header, iframe').remove()
    const pageText = $('body').text().replace(/\s+/g, ' ').trim().substring(0, 10000)

    if (!pageText || pageText.length < 50) {
      return NextResponse.json({ error: 'Could not extract enough meaningful text from the URL' }, { status: 400 })
    }

    // 4. Call Gemini API — generate the correct number of variants for this plan
    const prompt = `
You are an expert cold outreach copywriter who writes highly natural, human-like, short messages.

Your task is to generate exactly ${variantCount} different personalized cold outreach opening message${variantCount > 1 ? 's' : ''} based on a website. Each message must be unique in angle and phrasing.

Website Content to Analyze:
---
${pageText}
---

IMPORTANT STYLE RULES:
* Write like a real human sending a quick DM (NOT an email)
* Keep each message SHORT (2-3 sentences max, 20–35 words total)
* Use simple, casual English (no corporate language)
* DO NOT sound like a sales pitch
* DO NOT explain too much
* DO NOT use buzzwords like: "amplify", "leverage", "enhance", "unlock growth"
* Avoid long sentences
* Each variant must have a DIFFERENT opening angle, hook, or observation

STRUCTURE for each message:
Start with "Hey, I checked your [site/store]..."
Mention something specific and real from the website.
End with one simple, relevant question.

PERSONALIZATION RULE:
* Mention something REAL from the website (products, layout, niche, offer)
* Keep it natural, not forced

EXAMPLE:
"Hey, I checked your store and loved how clean your candle product pages look. Are you handling customer messages manually right now?"

CRITICAL OUTPUT FORMAT:
Return ONLY a JSON array containing exactly ${variantCount} string${variantCount > 1 ? 's' : ''}. No markdown, no code blocks, no extra text.
Example: ["Message variant 1"${variantCount >= 2 ? ', "Message variant 2"' : ''}${variantCount >= 3 ? ', "Message variant 3"' : ''}${variantCount >= 4 ? ', "Message variant 4"' : ''}]
    `

    const aiResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    })

    const generatedText = aiResponse.text || '[]'
    
    let messages: string[] = []
    try {
      const parsed = JSON.parse(generatedText)
      // Accept either an array or a plain string
      if (Array.isArray(parsed)) {
        messages = parsed.slice(0, variantCount) // enforce plan variant count
      } else if (typeof parsed === 'string') {
        messages = [parsed]
      } else {
        throw new Error('Unexpected response shape')
      }
    } catch (e) {
      console.error('Failed to parse Gemini response', generatedText)
      return NextResponse.json({ error: 'Failed to generate message — please try again.' }, { status: 500 })
    }

    // 5. Update user usage count
    await supabase
      .from('users')
      .update({ usage_count: userData.usage_count + 1 })
      .eq('id', userId)

    // 6. Log the generation (optional for history)
    await supabase
      .from('generations')
      .insert({
        user_id: userId,
        input_url: safeUrlString,
        output_text: JSON.stringify(messages)
      })

    return NextResponse.json({ messages })

  } catch (error: Error | any) {
    console.error('API /generate Error:', error?.message || error)
    // Avoid leaking stack traces to the client
    return NextResponse.json({ error: 'An internal server error occurred during generation.' }, { status: 500 })
  }
}
