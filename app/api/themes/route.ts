import { NextResponse } from 'next/server'
import { cosmic } from '@/lib/cosmic'

export async function GET() {
  try {
    const response = await cosmic.objects
      .find({ type: 'themes' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
    
    return NextResponse.json({ themes: response.objects })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch themes' },
      { status: 500 }
    )
  }
}