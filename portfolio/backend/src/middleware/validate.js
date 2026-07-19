import { validationResult } from 'express-validator'

/**
 * Express middleware that reads express-validator results and short-circuits
 * with a 422 response if any validation errors exist.
 */
export function validate(req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
  next()
}
