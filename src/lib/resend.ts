import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) {
  throw new Error('Missing RESEND_API_KEY environment variable')
}

export const resend = new Resend(process.env.RESEND_API_KEY)

// For development, use Resend's testing domain
const isDevelopment = process.env.NODE_ENV === 'development'

// Replace 'yourdomain.com' with your actual domain when deploying to production
export const DEFAULT_FROM_EMAIL = isDevelopment
  ? 'Max App <onboarding@resend.dev>'
  : 'Max App <no-reply@yourdomain.com>' // Replace yourdomain.com with your actual domain
