import { Request, Response, NextFunction } from 'express';

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Get data from request body
  const { id, username, password } = req.body;

  // Create an array to store errors
  const errors: string[] = [];

  // Validate data
  if (!id) {
    errors.push('ID is required');
  }

  if (!username) {
    errors.push('Name is required');
  }

  if (!password) {
    errors.push('Password is required');
  } else {
    // Validate password length
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
  }

  // If there are errors
  if (errors.length > 0) {
    res.status(422).json({
      message: 'Validation failed',
      errors,
    });
  }

  // Pass user data to the next middleware
  next();
};
