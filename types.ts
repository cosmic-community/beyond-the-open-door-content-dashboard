// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Theme interface
export interface Theme extends CosmicObject {
  type: 'themes';
  metadata: {
    description?: string;
    color?: string;
  };
}

// Journal Entry interface
export interface JournalEntry extends CosmicObject {
  type: 'journal-entries';
  metadata: {
    content?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    theme?: Theme;
    reflection_question?: string;
  };
}

// Quote interface
export interface Quote extends CosmicObject {
  type: 'quotes';
  metadata: {
    quote_text?: string;
    author?: string;
    background_image?: {
      url: string;
      imgix_url: string;
    };
    theme?: Theme;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Type guards
export function isJournalEntry(obj: CosmicObject): obj is JournalEntry {
  return obj.type === 'journal-entries';
}

export function isQuote(obj: CosmicObject): obj is Quote {
  return obj.type === 'quotes';
}

export function isTheme(obj: CosmicObject): obj is Theme {
  return obj.type === 'themes';
}