import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { resend, DEFAULT_FROM_EMAIL } from '@/lib/resend'
import AdminReplyEmail from '@/emails/AdminReply'
import type { Database } from '@/lib/supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { submissionId, replyMessage } = body

    console.log('Processing reply request:', { submissionId, replyMessage })

    if (!submissionId || !replyMessage) {
      return NextResponse.json(
        { error: 'Submission ID and reply message are required' },
        { status: 400 },
      )
    }

    // Create a Supabase client with service role key for admin operations
    const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

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

    // Send reply email
    try {
      await resend.emails.send({
        from: DEFAULT_FROM_EMAIL,
        to: submission.email,
        subject: 'Response to your inquiry - Max App',
        react: AdminReplyEmail({
          name: submission.first_name,
          message: replyMessage,
        }) as React.ReactElement,
      })
    } catch (emailError) {
      console.error('Error sending reply email:', emailError)
      return NextResponse.json(
        { error: 'Failed to send reply email' },
        { status: 500 },
      )
    }

    return NextResponse.json({ success: true, submission })
  } catch (error) {
    console.error('Error in admin reply API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
