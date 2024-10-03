import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: Request, { params }: { params: { league: string } }) {
  const league = params.league

  try {
    const { data, error } = await supabase
      .from('football_clubs')
      .select('*')
      .eq('league', league)

    if (error) throw error

    return NextResponse.json(data)
  } catch (error: unknown) {
    console.error('Error fetching football clubs:', error);
    return NextResponse.json({ error: 'An error occurred while fetching the data' }, { status: 500 })
  }
}