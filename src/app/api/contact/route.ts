import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { resend, DEFAULT_FROM_EMAIL } from '@/lib/resend'
import ContactConfirmationEmail from '@/emails/ContactConfirmation'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, message } = body

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

    // Send confirmation email
    try {
      await resend.emails.send({
        from: DEFAULT_FROM_EMAIL,
        to: email,
        subject: 'Thank you for contacting Max App',
        react: ContactConfirmationEmail({
          name: firstName,
        }) as React.ReactElement,
      })
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError)
      // Don't return error response here as the submission was successful
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
