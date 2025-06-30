import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export interface ContactSubmission {
  id: number
  created_at: string
  first_name: string
  last_name: string
  email: string
  phone: string
  message: string
  status: 'new' | 'replied' | 'archived'
  replied_at?: string
  replied_by?: string
  reply_message?: string
}

export interface Database {
  public: {
    Tables: {
      contact_submissions: {
        Row: ContactSubmission
        Insert: Omit<ContactSubmission, 'id' | 'created_at'>
        Update: Partial<Omit<ContactSubmission, 'id' | 'created_at'>>
      }
    }
  }
}

export const createClient = () => {
  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return document.cookie
          .split('; ')
          .find((row) => row.startsWith(`${name}=`))
          ?.split('=')[1]
      },
      set(
        name: string,
        value: string,
        options: { path?: string; maxAge?: number },
      ) {
        document.cookie = `${name}=${value}${options.path ? `;path=${options.path}` : ''}${
          options.maxAge ? `;max-age=${options.maxAge}` : ''
        }`
      },
      remove(name: string, options: { path?: string }) {
        document.cookie = `${name}=;max-age=0${options.path ? `;path=${options.path}` : ''}`
      },
    },
  })
}
