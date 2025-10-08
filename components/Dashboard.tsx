'use client'

import { useState } from 'react'
import { JournalEntry, Quote, Theme } from '@/types'
import JournalEntryCard from './JournalEntryCard'
import QuoteCard from './QuoteCard'
import ThemeCard from './ThemeCard'

interface DashboardProps {
  journalEntries: JournalEntry[]
  quotes: Quote[]
  themes: Theme[]
}

type ContentTab = 'journal' | 'quotes' | 'themes'

export default function Dashboard({ journalEntries, quotes, themes }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<ContentTab>('journal')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTheme, setSelectedTheme] = useState<string>('all')

  // Filter content based on search and theme
  const filterContent = <T extends JournalEntry | Quote>(items: T[]) => {
    return items.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.metadata?.quote_text?.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.metadata?.content?.toLowerCase().includes(searchQuery.toLowerCase()))
      
      const matchesTheme = selectedTheme === 'all' || 
        item.metadata?.theme?.slug === selectedTheme

      return matchesSearch && matchesTheme
    })
  }

  const filteredJournalEntries = filterContent(journalEntries)
  const filteredQuotes = filterContent(quotes)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Beyond the Open Door
          </h1>
          <p className="text-gray-600 mt-1">Content Management Dashboard</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-courage">
            <div className="text-sm font-medium text-gray-600">Journal Entries</div>
            <div className="text-3xl font-bold text-gray-900 mt-2">{journalEntries.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-transformation">
            <div className="text-sm font-medium text-gray-600">Quotes</div>
            <div className="text-3xl font-bold text-gray-900 mt-2">{quotes.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-discovery">
            <div className="text-sm font-medium text-gray-600">Themes</div>
            <div className="text-3xl font-bold text-gray-900 mt-2">{themes.length}</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('journal')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'journal'
                    ? 'border-courage text-courage'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                📖 Journal Entries ({filteredJournalEntries.length})
              </button>
              <button
                onClick={() => setActiveTab('quotes')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'quotes'
                    ? 'border-transformation text-transformation'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                💬 Quotes ({filteredQuotes.length})
              </button>
              <button
                onClick={() => setActiveTab('themes')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'themes'
                    ? 'border-discovery text-discovery'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                🎯 Themes ({themes.length})
              </button>
            </nav>
          </div>

          {/* Filters */}
          {activeTab !== 'themes' && (
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search content..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div className="sm:w-48">
                  <select
                    value={selectedTheme}
                    onChange={(e) => setSelectedTheme(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="all">All Themes</option>
                    {themes.map(theme => (
                      <option key={theme.id} value={theme.slug}>
                        {theme.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div>
          {activeTab === 'journal' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJournalEntries.length > 0 ? (
                filteredJournalEntries.map(entry => (
                  <JournalEntryCard key={entry.id} entry={entry} />
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-gray-500">
                  No journal entries found
                </div>
              )}
            </div>
          )}

          {activeTab === 'quotes' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredQuotes.length > 0 ? (
                filteredQuotes.map(quote => (
                  <QuoteCard key={quote.id} quote={quote} />
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-gray-500">
                  No quotes found
                </div>
              )}
            </div>
          )}

          {activeTab === 'themes' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {themes.length > 0 ? (
                themes.map(theme => (
                  <ThemeCard 
                    key={theme.id} 
                    theme={theme}
                    journalCount={journalEntries.filter(e => e.metadata?.theme?.id === theme.id).length}
                    quoteCount={quotes.filter(q => q.metadata?.theme?.id === theme.id).length}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-gray-500">
                  No themes found
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}