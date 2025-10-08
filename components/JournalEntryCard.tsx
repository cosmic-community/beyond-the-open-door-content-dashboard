'use client'

import { JournalEntry } from '@/types'
import Link from 'next/link'

interface JournalEntryCardProps {
  entry: JournalEntry
}

export default function JournalEntryCard({ entry }: JournalEntryCardProps) {
  const featuredImage = entry.metadata?.featured_image
  const theme = entry.metadata?.theme
  const reflectionQuestion = entry.metadata?.reflection_question
  
  // Get theme color with fallback
  const themeColor = theme?.metadata?.color || '#3498db'

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {featuredImage && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={`${featuredImage.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
            alt={entry.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">📖</span>
          {theme && (
            <span
              className="px-3 py-1 rounded-full text-xs font-medium text-white"
              style={{ backgroundColor: themeColor }}
            >
              {theme.title}
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {entry.title}
        </h3>

        {reflectionQuestion && (
          <p className="text-sm text-gray-600 italic mb-4 line-clamp-2">
            {reflectionQuestion}
          </p>
        )}

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <span className="text-xs text-gray-500">
            {new Date(entry.created_at).toLocaleDateString()}
          </span>
          <Link
            href={`/journal/${entry.slug}`}
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Read More →
          </Link>
        </div>
      </div>
    </div>
  )
}