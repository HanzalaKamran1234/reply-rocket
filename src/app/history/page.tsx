import { auth } from '@clerk/nextjs/server'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import HistoryClient from './HistoryClient'

export default async function HistoryPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/login')
  }

  const supabase = await createClient()

  const { data: generations, error } = await supabase
    .from('generations')
    .select('id, input_url, output_text, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(100)

  const items = (generations ?? []).map((g) => {
    let messages: string[] = []
    try {
      messages = JSON.parse(g.output_text)
    } catch {
      messages = [g.output_text]
    }
    return {
      id: g.id,
      url: g.input_url,
      messages,
      createdAt: g.created_at,
    }
  })

  return <HistoryClient items={items} />
}
