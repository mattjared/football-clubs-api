import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('football_clubs')
      .select('league')
      .not('league', 'is', null)
      .order('league');
    if (error) throw error

    // Remove duplicates and extract league names
    const uniqueLeagues = Array.from(new Set(data.map(item => item.league)))

    return NextResponse.json(uniqueLeagues)
  } catch (error) {
    console.error('Error fetching leagues:', error);
    return NextResponse.json({ error: 'An error occurred while fetching the leagues' }, { status: 500 })
  }
}