import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from '@react-email/components'
import * as React from 'react'

interface AdminReplyEmailProps {
  name: string
  message: string
}

export const AdminReplyEmail = ({ name, message }: AdminReplyEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Response to your inquiry</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Hello {name},</Heading>
          <Text style={text}>
            Thank you for your patience. Here is our response to your inquiry:
          </Text>
          <Text style={messageStyle}>{message}</Text>
          <Text style={text}>
            If you have any further questions, please don&apos;t hesitate to
            contact us again.
          </Text>
          <Text style={text}>
            Best regards,
            <br />
            The MaxApp Team
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default AdminReplyEmail

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

const messageStyle = {
  color: '#1a1a1a',
  fontSize: '16px',
  lineHeight: '1.5',
  margin: '24px 0',
  padding: '16px',
  backgroundColor: '#f5f5f5',
  borderRadius: '4px',
}
