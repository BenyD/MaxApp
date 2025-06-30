import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) {
  throw new Error('Missing RESEND_API_KEY environment variable')
}

export const resend = new Resend(process.env.RESEND_API_KEY)

// For development, use Resend's testing domain
const isDevelopment = process.env.NODE_ENV === 'development'

// In development, use Resend's testing domain
// In production, use verified maxapp.ch domain
export const DEFAULT_FROM_EMAIL = isDevelopment
  ? 'MaxApp <onboarding@resend.dev>'
  : 'MaxApp <no-reply@maxapp.ch>'
