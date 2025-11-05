import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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
