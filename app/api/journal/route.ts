import { NextResponse } from 'next/server'
import { cosmic } from '@/lib/cosmic'

export async function GET() {
  try {
    const response = await cosmic.objects
      .find({ type: 'journal-entries' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)
    
    return NextResponse.json({ entries: response.objects })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch journal entries' },
      { status: 500 }
    )
  }
}