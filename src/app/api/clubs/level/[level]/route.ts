import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: Request, { params }: { params: { level: string } }) {
  const level = parseInt(params.level)

  if (isNaN(level)) {
    return NextResponse.json({ error: 'Invalid level parameter' }, { status: 400 })
  }

  try {
    const { data, error } = await supabase
      .from('football_clubs')
      .select('*')
      .eq('level', level)

    if (error) throw error

    return NextResponse.json(data)
  } catch (error: unknown) {
    console.error('Error fetching football clubs:', error);
    return NextResponse.json({ error: 'An error occurred while fetching the data' }, { status: 500 })
  }
}