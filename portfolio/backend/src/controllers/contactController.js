import { sendContactEmail } from '../services/emailService.js'
import { logger } from '../utils/logger.js'

/**
 * POST /api/contact
 * Validates input (via express-validator in the route), then sends an email.
 */
export async function handleContact(req, res) {
  const { name, email, message } = req.body

  try {
    await sendContactEmail({ name, email, message })
    res.status(200).json({ success: true, message: 'Email sent successfully.' })
  } catch (err) {
    logger.error('Failed to send contact email', { error: err.message })
    res.status(500).json({ success: false, error: 'Failed to send message. Please try again.' })
  }
}
