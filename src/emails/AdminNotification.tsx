import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Section,
} from '@react-email/components'
import * as React from 'react'

interface AdminNotificationEmailProps {
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
}

export const AdminNotificationEmail = ({
  firstName,
  lastName,
  email,
  phone,
  message,
}: AdminNotificationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>
        New Contact Form Submission from {firstName} {lastName}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Contact Form Submission</Heading>

          <Section style={section}>
            <Text style={label}>Contact Details:</Text>
            <Text style={detail}>
              <strong>Name:</strong> {firstName} {lastName}
            </Text>
            <Text style={detail}>
              <strong>Email:</strong> {email}
            </Text>
            <Text style={detail}>
              <strong>Phone:</strong> {phone}
            </Text>
          </Section>

          <Section style={section}>
            <Text style={label}>Message:</Text>
            <Text style={message_style}>{message}</Text>
          </Section>

          <Text style={text}>
            You can view all submissions in the admin dashboard.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default AdminNotificationEmail

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '580px',
}

const section = {
  margin: '0 0 24px',
  padding: '20px',
  backgroundColor: '#f9fafb',
  borderRadius: '8px',
}

const h1 = {
  color: '#1a1a1a',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '1.3',
  margin: '0 0 24px',
}

const text = {
  color: '#4c4c4c',
  fontSize: '16px',
  lineHeight: '1.5',
  margin: '0 0 16px',
}

const label = {
  ...text,
  fontWeight: '600',
  margin: '0 0 8px',
}

const detail = {
  ...text,
  margin: '0 0 8px',
}

const message_style = {
  ...text,
  whiteSpace: 'pre-wrap',
  backgroundColor: '#ffffff',
  padding: '12px',
  borderRadius: '4px',
  border: '1px solid #e5e7eb',
}
