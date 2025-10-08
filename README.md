# Beyond the Open Door - Content Dashboard

![App Preview](https://imgix.cosmicjs.com/955847a0-a3ee-11f0-8097-1935875d6ffe-photo-1519834785169-98be25ec3f84-1759890554677.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A powerful React-based content management dashboard for the "Beyond the Open Door" platform, designed to help you manage journal entries, inspirational quotes, and thematic content focused on personal growth and transformation.

## Features

- 📝 **Journal Entry Management** - Create, edit, and delete journal entries with markdown support
- 💬 **Quote Library** - Manage inspirational quotes with authors and background images
- 🎯 **Theme Organization** - Organize content by themes (Courage, Transformation, Healing, Self-Discovery)
- 🔍 **Advanced Search & Filtering** - Search and filter content by theme, keywords, and dates
- 🎨 **Rich Content Editor** - Full markdown support with live preview
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- 🖼️ **Image Management** - Upload and optimize images with imgix integration
- 🌈 **Theme Color Coding** - Visual organization with theme-specific colors

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68e5ca4d39d1c0696daa5aac&clone_repository=68e5dd2e3393cb29a9184171)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a personal growth and transformation platform with journal entries, inspirational quotes, and themes"

### Code Generation Prompt

> "Create a React dashboard that displays and manages my existing content"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic CMS** - Headless CMS for content management
- **React Markdown** - Markdown rendering for journal entries
- **Bun** - Fast JavaScript runtime and package manager

## Getting Started

### Prerequisites

- Bun installed on your machine
- A Cosmic account with bucket access
- Node.js 18+ (for compatibility)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd beyond-the-open-door-dashboard
```

2. Install dependencies:
```bash
bun install
```

3. Create a `.env.local` file in the root directory:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Cosmic SDK Examples

### Fetching Journal Entries with Themes

```typescript
import { cosmic } from '@/lib/cosmic'

// Get all journal entries with related theme data
const response = await cosmic.objects
  .find({ type: 'journal-entries' })
  .props(['id', 'title', 'slug', 'metadata', 'created_at'])
  .depth(1)

const entries = response.objects
```

### Creating a New Quote

```typescript
await cosmic.objects.insertOne({
  type: 'quotes',
  title: 'New Inspirational Quote',
  metadata: {
    quote_text: 'Your quote text here',
    author: 'Author Name',
    theme: themeId // Reference to theme object
  }
})
```

### Updating a Journal Entry

```typescript
await cosmic.objects.updateOne(entryId, {
  title: 'Updated Title',
  metadata: {
    content: '# Updated Content\n\nYour markdown here',
    reflection_question: 'Updated reflection question?'
  }
})
```

## Cosmic CMS Integration

This dashboard integrates with three main content types in your Cosmic bucket:

### Journal Entries
- **Content** (markdown) - Full journal entry content
- **Featured Image** (file) - Header image for the entry
- **Theme** (object) - Associated theme (Courage, Transformation, etc.)
- **Reflection Question** (text) - Thought-provoking question

### Quotes
- **Quote Text** (textarea) - The inspirational quote
- **Author** (text) - Quote attribution
- **Background Image** (file) - Visual background for the quote
- **Theme** (object) - Associated theme

### Themes
- **Description** (textarea) - Theme description
- **Color** (color) - Hex color for visual identification

All content is fetched with `depth: 1` to include related theme data in a single query.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COSMIC_WRITE_KEY`
4. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Import your repository in Netlify
3. Set build command: `bun run build`
4. Set publish directory: `.next`
5. Add environment variables in Netlify dashboard
6. Deploy!

## Project Structure

```
├── app/
│   ├── page.tsx                 # Dashboard home
│   ├── journal/                 # Journal entry pages
│   ├── quotes/                  # Quote pages
│   ├── themes/                  # Theme pages
│   └── layout.tsx              # Root layout
├── components/
│   ├── Dashboard.tsx           # Main dashboard component
│   ├── JournalEntryCard.tsx   # Journal entry display
│   ├── QuoteCard.tsx          # Quote display
│   ├── ThemeCard.tsx          # Theme display
│   └── CosmicBadge.tsx        # Cosmic branding
├── lib/
│   └── cosmic.ts              # Cosmic SDK configuration
└── types.ts                    # TypeScript definitions
```

<!-- README_END -->