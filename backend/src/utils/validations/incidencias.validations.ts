import {
    Request,
    Response,
    NextFunction
  } from 'express';
  
  export const validateIncidencia = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
  
    // Get data from request body
    const {
      id,
      name,
      email,
      password
    } = req.body;
  
    // Create an array to store errors
    const errors = [];
  
    // Validate data
    if (!id) {
      errors.push('id is required');
    }
  
    if (!name) {
      errors.push('name is required');
    }
  
    if (!email) {
      errors.push('email is required');
    }
  
    if (!password) {
      errors.push('password is required');
    } else {
      // Add more validations here
      // e.g. password must be at least 8 chars long
      if (password.length < 8) {
        errors.push('password must be at least 8 chars long');
      }
    }
  
    // If there are errors
    // return 422 (Unprocessable Entity)
    if (errors.length) {
      return res.status(422).json({
        message: 'Validation failed',
        errors,
      });
    }
  
    // Pass Incidencia data to the next middleware
    next();
  };