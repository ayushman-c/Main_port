import nodemailer from 'nodemailer'
import { logger } from '../utils/logger.js'

const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST,
  port:   Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

/**
 * Send a contact form email.
 * @param {{ name: string, email: string, message: string }} data
 */
export async function sendContactEmail({ name, email, message }) {
  const mailOptions = {
    from:    process.env.MAIL_FROM,
    to:      process.env.MAIL_TO,
    replyTo: email,
    subject: `Portfolio Contact from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    html: `
      <h2>New Portfolio Contact</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <h3>Message</h3>
      <p style="white-space:pre-wrap">${message}</p>
    `,
  }

  const info = await transporter.sendMail(mailOptions)
  logger.info(`Contact email sent: ${info.messageId}`)
  return info
}
