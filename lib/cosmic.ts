import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Helper function for error handling
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all journal entries with themes
export async function getJournalEntries() {
  try {
    const response = await cosmic.objects
      .find({ type: 'journal-entries' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch journal entries');
  }
}

// Fetch all quotes with themes
export async function getQuotes() {
  try {
    const response = await cosmic.objects
      .find({ type: 'quotes' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch quotes');
  }
}

// Fetch all themes
export async function getThemes() {
  try {
    const response = await cosmic.objects
      .find({ type: 'themes' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at']);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch themes');
  }
}

// Fetch single journal entry
export async function getJournalEntry(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'journal-entries', slug })
      .depth(1);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch journal entry');
  }
}

// Fetch single quote
export async function getQuote(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'quotes', slug })
      .depth(1);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch quote');
  }
}

// Delete object
export async function deleteObject(id: string) {
  try {
    await cosmic.objects.deleteOne(id);
    return { success: true };
  } catch (error) {
    console.error('Error deleting object:', error);
    throw new Error('Failed to delete object');
  }
}