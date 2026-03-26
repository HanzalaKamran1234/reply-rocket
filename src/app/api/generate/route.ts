import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { GoogleGenAI } from '@google/genai'
import { auth, currentUser } from '@clerk/nextjs/server'
import * as cheerio from 'cheerio'

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

export async function POST(request: Request) {
  try {
    const supabase = await createClient()

    // 1. Authenticate user via Clerk
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

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

    const limits = {
      free: 60,
      starter: 500,
      pro: Infinity
    }

    const currentLimit = limits[userData.plan as keyof typeof limits] || 60

    if (userData.usage_count >= currentLimit) {
      return NextResponse.json({ error: `Usage limit reached for ${userData.plan} plan. Please upgrade.` }, { status: 403 })
    }

    // 3. Scrape the URL
    console.log(`Scraping URL: ${url}`)
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ReplyRocketBot/1.0; +http://replyrocket.io)'
      }
    })

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

    // 4. Call Gemini API
    const prompt = `
      You are an expert sales SDR. 
      Analyze the following text extracted from a company's website:
      ---
      ${pageText}
      ---
      
      Based strictly on the content above, generate 3 highly personalized, distinct cold outreach messages (variants) tailored to a decision maker at this company.
      
      Requirements for the messages:
      1. Reference a specific value proposition or detail you found in their website text.
      2. Keep it concise (under 100 words per message).
      3. Use a casual but professional tone.
      4. Avoid marketing fluff or generic templates. 
      5. Include a clear, low-friction Call to Action (CTA).
      
      Format your response as a JSON array of strings containing the 3 messages. Do not use markdown blocks, just return valid JSON.
      Example: ["Message 1...", "Message 2...", "Message 3..."]
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
      messages = JSON.parse(generatedText)
    } catch (e) {
      console.error('Failed to parse Gemini response', generatedText)
      return NextResponse.json({ error: 'Failed to generate messages formatted correctly' }, { status: 500 })
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
        input_url: url,
        output_text: JSON.stringify(messages)
      })

    return NextResponse.json({ messages })

  } catch (error: any) {
    console.error('API /generate Error:', error)
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 })
  }
}
