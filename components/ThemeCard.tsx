'use client'

import { Theme } from '@/types'

interface ThemeCardProps {
  theme: Theme
  journalCount: number
  quoteCount: number
}

export default function ThemeCard({ theme, journalCount, quoteCount }: ThemeCardProps) {
  const description = theme.metadata?.description
  const color = theme.metadata?.color || '#3498db'

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div
        className="h-4"
        style={{ backgroundColor: color }}
      />
      
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">🎯</span>
          <h3 className="text-xl font-bold text-gray-900">
            {theme.title}
          </h3>
        </div>

        {description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
            {description}
          </p>
        )}

        <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {journalCount}
            </div>
            <div className="text-xs text-gray-500">
              Journal Entries
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {quoteCount}
            </div>
            <div className="text-xs text-gray-500">
              Quotes
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}