import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const league = searchParams.get('league')
  const level = searchParams.get('level')
  const club = searchParams.get('club')
  const nickname = searchParams.get('nickname')

  try {
    let query = supabase.from('football_clubs').select('*')

    if (league) {
      query = query.eq('league', league)
    }

    if (level) {
      const levelNum = parseInt(level)
      if (!isNaN(levelNum)) {
        query = query.eq('level', levelNum)
      }
    }

    if (club) { 
      query = query.ilike('name', `%${club}%`)
    }

    if (nickname) {
      query = query.ilike('nickname', `%${nickname}%`)
    }

    const { data, error } = await query

    if (error) throw error

    if (data.length === 0) {
      return NextResponse.json({ message: 'No matching clubs found' }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error: unknown) {
    console.error('Error fetching football clubs:', error);
    return NextResponse.json({ error: 'An error occurred while fetching the data' }, { status: 500 })
  }
}

// Examples of how to call this in a browser:

// 1. Filter by league:
// http://localhost:3000/filter?league=Premier%20League 

// 2. Filter by level:
// http://localhost:3000/filter?level=1

// 3. Filter by club name:
// http://localhost:3000/filter?club=Manchester

// 4. Combine multiple filters:
// http://localhost:3000/filter?league=Premier%20League&level=1&club=Manchester

// 5. No filters (returns all clubs):
// http://localhost:3000/filter

// 6. Filter by nickname:
// http://localhost:3000/filter?nickname=United

// Note: Replace 'localhost:3000' with your actual domain if deployed