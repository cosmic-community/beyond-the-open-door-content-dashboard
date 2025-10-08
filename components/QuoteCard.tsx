'use client'

import { Quote } from '@/types'

interface QuoteCardProps {
  quote: Quote
}

export default function QuoteCard({ quote }: QuoteCardProps) {
  const backgroundImage = quote.metadata?.background_image
  const theme = quote.metadata?.theme
  const quoteText = quote.metadata?.quote_text
  const author = quote.metadata?.author
  
  // Get theme color with fallback
  const themeColor = theme?.metadata?.color || '#9b59b6'

  return (
    <div className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-80">
      {backgroundImage && (
        <div className="absolute inset-0">
          <img
            src={`${backgroundImage.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
            alt={quote.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        </div>
      )}
      
      <div className="relative h-full p-6 flex flex-col justify-between text-white">
        <div>
          {theme && (
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white mb-4"
              style={{ backgroundColor: themeColor }}
            >
              {theme.title}
            </span>
          )}
          
          {quoteText && (
            <blockquote className="text-lg font-medium leading-relaxed">
              "{quoteText}"
            </blockquote>
          )}
        </div>

        <div className="flex items-center justify-between">
          {author && (
            <cite className="text-sm not-italic font-medium">
              — {author}
            </cite>
          )}
          <span className="text-2xl">💡</span>
        </div>
      </div>
    </div>
  )
}