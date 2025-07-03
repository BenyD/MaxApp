import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { resend, DEFAULT_FROM_EMAIL } from '@/lib/resend'
import ContactConfirmationEmail from '@/emails/ContactConfirmation'
import AdminNotificationEmail from '@/emails/AdminNotification'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const ADMIN_EMAIL = 'web@maxapp.ch'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, message } = body

    console.log('Processing contact form submission:', {
      firstName,
      lastName,
      email,
    })
    console.log('Environment:', {
      isDev: process.env.NODE_ENV === 'development',
      hasResendKey: !!process.env.RESEND_API_KEY,
      fromEmail: DEFAULT_FROM_EMAIL,
    })

    // Validate input
    if (!firstName || !lastName || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 },
      )
    }

    // Create a Supabase client with service role key for admin operations
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Save to Supabase
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
          message,
          status: 'new',
        },
      ])
      .select()

    if (error) {
      console.error('Error saving contact submission:', error)
      return NextResponse.json(
        { error: 'Failed to save contact submission' },
        { status: 500 },
      )
    }

    // Send emails
    try {
      const isDevelopment = process.env.NODE_ENV === 'development'

      // Send confirmation email to user
      const userEmail = isDevelopment ? ADMIN_EMAIL : email
      await resend.emails.send({
        from: DEFAULT_FROM_EMAIL,
        to: userEmail,
        subject: 'Thank you for contacting Max App',
        react: ContactConfirmationEmail({
          name: firstName,
        }) as React.ReactElement,
      })

      // Send notification email to admin
      await resend.emails.send({
        from: DEFAULT_FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `New Contact Form Submission: ${firstName} ${lastName}`,
        react: AdminNotificationEmail({
          firstName,
          lastName,
          email,
          phone,
          message,
        }) as React.ReactElement,
      })

      if (isDevelopment) {
        console.log('Development mode: All emails sent to', ADMIN_EMAIL)
      }
    } catch (emailError) {
      console.error('Error sending emails:', emailError)
      // Don't return error response here as the submission was successful
      if (process.env.NODE_ENV === 'development') {
        console.log('Continuing despite email error in development mode')
      }
    }

    return NextResponse.json({ success: true, data: data[0] })
  } catch (error) {
    console.error('Error in contact API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
