// app/journal/[slug]/page.tsx
import { getJournalEntry } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

export const revalidate = 0

export default async function JournalEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const entry = await getJournalEntry(slug)

  if (!entry) {
    notFound()
  }

  const featuredImage = entry.metadata?.featured_image
  const theme = entry.metadata?.theme
  const content = entry.metadata?.content
  const reflectionQuestion = entry.metadata?.reflection_question
  const themeColor = theme?.metadata?.color || '#3498db'

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mb-8"
        >
          ← Back to Dashboard
        </Link>

        <article className="bg-white rounded-lg shadow-xl overflow-hidden">
          {featuredImage && (
            <div className="relative h-96 overflow-hidden">
              <img
                src={`${featuredImage.imgix_url}?w=1200&h=800&fit=crop&auto=format,compress`}
                alt={entry.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8 sm:p-12">
            {theme && (
              <span
                className="inline-block px-4 py-2 rounded-full text-sm font-medium text-white mb-6"
                style={{ backgroundColor: themeColor }}
              >
                {theme.title}
              </span>
            )}

            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              {entry.title}
            </h1>

            <div className="text-sm text-gray-500 mb-8">
              {new Date(entry.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>

            {content && (
              <div className="prose prose-lg max-w-none mb-12">
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>
            )}

            {reflectionQuestion && (
              <div className="border-l-4 border-primary bg-blue-50 p-6 rounded-r-lg">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Reflection Question
                </p>
                <p className="text-lg text-gray-900 italic">
                  {reflectionQuestion}
                </p>
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  )
}