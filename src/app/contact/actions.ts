'use server'

import { Resend } from 'resend'

// resend is initialized inside the action to ensure process.env is ready
export async function sendContactMessage(formData: FormData) {
  // Honeypot check
  const botField = formData.get('bot_field')
  if (botField) {
    return { success: false, error: 'Form validation failed.' }
  }
  const apiKey = process.env.RESEND_API_KEY?.trim()
  if (!apiKey) {
    console.error('RESEND_API_KEY is not configured')
    return { success: false, error: 'Email service is not configured.' }
  }
  const resend = new Resend(apiKey)

  const name = (formData.get('name') as string)?.trim() || ''
  const email = (formData.get('email') as string)?.trim() || ''
  const message = (formData.get('message') as string)?.trim() || ''

  if (!name || !email || !message) {
    return { success: false, error: 'All fields are required.' }
  }

  if (name.length > 100) return { success: false, error: 'Name is too long.' }
  if (message.length > 2000) return { success: false, error: 'Message is too long.' }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email) || email.length > 150) {
    return { success: false, error: 'Invalid email address.' }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'ReplyRocket Contact <onboarding@resend.dev>', // Resend standard testing loop if domain isn't verified
      to: ['growtoglow44@gmail.com'],
      subject: `New Contact form submission from ${name}`,
      replyTo: email,
      text: `
Name: ${name}
Email: ${email}
Message:
${message}
      `,
    })

    if (error) {
      console.error('Resend error', error)
      return { success: false, error: 'Failed to send message.' }
    }

    return { success: true }
  } catch (error: any) {
    console.error('Server error', error)
    return { success: false, error: 'An internal server error occurred.' }
  }
}
