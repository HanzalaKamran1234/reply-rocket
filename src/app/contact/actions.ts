'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendContactMessage(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const message = formData.get('message') as string

  if (!name || !email || !message) {
    return { success: false, error: 'All fields are required.' }
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
