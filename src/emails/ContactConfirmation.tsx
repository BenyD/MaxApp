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

interface ContactConfirmationEmailProps {
  name: string
}

export const ContactConfirmationEmail = ({
  name,
}: ContactConfirmationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Thanks for contacting us!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Thank you for reaching out!</Heading>
          <Text style={text}>Dear {name},</Text>
          <Text style={text}>
            We have received your message and wanted to thank you for writing to
            us. We will get back to you as soon as possible.
          </Text>
          <Text style={text}>
            In the meantime, if you have any additional questions or concerns,
            please don&apos;t hesitate to reach out.
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

export default ContactConfirmationEmail

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
