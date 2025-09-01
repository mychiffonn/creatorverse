import type { Creator } from './types'
import { createClient } from '@supabase/supabase-js';

const URL = "https://fwakfgzriztvoajyozry.supabase.co"
const API_KEY = import.meta.env.VITE_SUPABASE_KEY
export const supabase = createClient(URL, API_KEY)

export async function fetchCreators(): Promise<Creator[]> {
  try {
    const { data, error } = await supabase
      .from('creators')
      .select('*')
      .order('name', { ascending: true })

    if (error) {
      console.error('Error fetching creators:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}

export async function fetchCreator(id: string): Promise<Creator | null> {
  try {
    const { data, error } = await supabase
      .from('creators')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching creator:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}

export async function addCreator(creator: Omit<Creator, 'id'>): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('creators')
      .insert([{
        name: creator.name,
        url: creator.url,
        description: creator.description,
        imageURL: creator.imageURL || null
      }])

    if (error) {
      console.error('Error adding creator:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error:', error)
    return false
  }
}

export async function updateCreator(id: string, creator: Omit<Creator, 'id'>): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('creators')
      .update({
        name: creator.name,
        url: creator.url,
        description: creator.description,
        imageURL: creator.imageURL || null
      })
      .eq('id', id)

    if (error) {
      console.error('Error updating creator:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error:', error)
    return false
  }
}

export async function deleteCreator(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('creators')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting creator:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error:', error)
    return false
  }
}
