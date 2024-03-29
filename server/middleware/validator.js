import { validationResult } from 'express-validator';

export default function validate(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  res.status(400).json({ message: errors.array()[0] });
}
