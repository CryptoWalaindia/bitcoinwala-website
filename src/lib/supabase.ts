import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

// Lazily create the client only when credentials are present.
// This prevents a hard crash on startup when env vars are missing.
const getSupabaseClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    return null
  }
  return createClient(supabaseUrl, supabaseAnonKey)
}

export const supabase = getSupabaseClient()

// Type definitions for contact form submissions
export interface ContactSubmission {
  id?: string
  first_name: string
  last_name: string
  email: string
  phone: string
  audience_type: string
  created_at?: string
}

// Function to save contact form submission to database
export async function saveContactSubmission(data: ContactSubmission) {
  if (!supabase) {
    const msg = 'Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.'
    console.warn('⚠️', msg)
    throw new Error(msg)
  }

  const { data: result, error } = await supabase
    .from('contact_submissions')
    .insert([
      {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        audience_type: data.audience_type,
      }
    ])
    .select()

  if (error) {
    console.error('❌ Error saving to Supabase:', error)
    console.error('Error details:', JSON.stringify(error, null, 2))
    throw error
  }

  console.log('✅ Contact submission saved to Supabase:', result)
  return result
}
