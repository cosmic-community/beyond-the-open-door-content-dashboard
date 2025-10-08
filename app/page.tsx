import { getJournalEntries, getQuotes, getThemes } from '@/lib/cosmic'
import Dashboard from '@/components/Dashboard'

export const revalidate = 0

export default async function HomePage() {
  const [journalEntries, quotes, themes] = await Promise.all([
    getJournalEntries(),
    getQuotes(),
    getThemes(),
  ])

  return (
    <Dashboard
      journalEntries={journalEntries}
      quotes={quotes}
      themes={themes}
    />
  )
}