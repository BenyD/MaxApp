import { NextResponse } from 'next/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'
import { resend, DEFAULT_FROM_EMAIL } from '@/lib/resend'
import AdminReplyEmail from '@/emails/AdminReply'
import type { Database } from '@/lib/supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Create a Supabase client with service role key for admin operations
const supabase = createServiceClient<Database>(supabaseUrl, supabaseServiceKey)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { submissionId, replyMessage } = body

    console.log('Processing reply request:', { submissionId, replyMessage })
    console.log('Environment:', {
      isDev: process.env.NODE_ENV === 'development',
      hasResendKey: !!process.env.RESEND_API_KEY,
      fromEmail: DEFAULT_FROM_EMAIL,
    })

    if (!submissionId || !replyMessage) {
      return NextResponse.json(
        { error: 'Submission ID and reply message are required' },
        { status: 400 },
      )
    }

    // First check if the submission exists
    const { data: submissions, error: checkError } = await supabase
      .from('contact_submissions')
      .select()
      .eq('id', submissionId)

    console.log('Check submission result:', { submissions, checkError })

    if (checkError) {
      console.error('Error checking submission:', checkError)
      return NextResponse.json(
        { error: 'Failed to check submission' },
        { status: 500 },
      )
    }

    if (!submissions || submissions.length === 0) {
      console.error('Submission not found:', submissionId)
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 },
      )
    }

    const submission = submissions[0]

    // Update submission status
    console.log('Updating submission status...')
    const { error: updateError } = await supabase
      .from('contact_submissions')
      .update({
        status: 'replied',
        reply_message: replyMessage,
        replied_at: new Date().toISOString(),
      })
      .eq('id', submissionId)

    if (updateError) {
      console.error('Error updating submission:', updateError)
      return NextResponse.json(
        { error: 'Failed to update submission status' },
        { status: 500 },
      )
    }
    console.log('Submission updated successfully')

    // Send reply email
    try {
      console.log('Attempting to send email to:', submission.email)
      const isDevelopment = process.env.NODE_ENV === 'development'

      // In development, always send to the verified email
      const toEmail = isDevelopment ? 'web@maxapp.ch' : submission.email

      console.log(
        'Sending email in',
        isDevelopment ? 'development' : 'production',
        'mode to:',
        toEmail,
      )

      const emailResult = await resend.emails.send({
        from: DEFAULT_FROM_EMAIL,
        to: toEmail,
        subject: 'Response to your inquiry - Max App',
        react: AdminReplyEmail({
          name: submission.first_name,
          message: replyMessage,
        }) as React.ReactElement,
      })
      console.log('Email sent successfully:', emailResult)

      if (isDevelopment && toEmail !== submission.email) {
        console.log(
          'Note: In development mode, emails are only sent to the verified email address:',
          toEmail,
        )
      }
    } catch (emailError) {
      console.error('Error sending reply email:', emailError)
      // Don't return error response since the database update was successful
      console.log('Continuing despite email error in development mode')
    }

    // Verify the update was successful
    const { data: verifySubmission, error: verifyError } = await supabase
      .from('contact_submissions')
      .select()
      .eq('id', submissionId)
      .single()

    console.log('Final submission state:', { verifySubmission, verifyError })

    return NextResponse.json({ success: true, submission: verifySubmission })
  } catch (error) {
    console.error('Error in admin reply API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
