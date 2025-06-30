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

// Create a Supabase client for browser environments
export const createClient = () => {
  return createBrowserClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        if (typeof document === 'undefined') return ''
        return document.cookie
          .split('; ')
          .find((row) => row.startsWith(`${name}=`))
          ?.split('=')[1]
      },
      set(
        name: string,
        value: string,
        options: {
          path?: string
          domain?: string
          maxAge?: number
          httpOnly?: boolean
          secure?: boolean
          sameSite?: 'strict' | 'lax' | 'none'
        },
      ) {
        if (typeof document === 'undefined') return
        document.cookie = `${name}=${value}; path=${options.path || '/'}`
      },
      remove(name: string, options: { path?: string; domain?: string }) {
        if (typeof document === 'undefined') return
        document.cookie = `${name}=; path=${options.path || '/'};max-age=0`
      },
    },
  })
}
