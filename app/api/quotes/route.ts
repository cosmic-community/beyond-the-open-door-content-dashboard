import { NextResponse } from 'next/server'
import { cosmic } from '@/lib/cosmic'

export async function GET() {
  try {
    const response = await cosmic.objects
      .find({ type: 'quotes' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)
    
    return NextResponse.json({ quotes: response.objects })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch quotes' },
      { status: 500 }
    )
  }
}