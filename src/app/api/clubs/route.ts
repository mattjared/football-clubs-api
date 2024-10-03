import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export interface FootballClub {
  id?: number;
  name: string;
  league: string;
  level: number;
  nickname: string;
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('football_clubs')
      .select('*')

    if (error) throw error

    return NextResponse.json(data)
  } catch (error: unknown) {
    console.error('Error fetching football clubs:', error);
    return NextResponse.json({ error: 'An error occurred while fetching the data' }, { status: 500 })
  }
}