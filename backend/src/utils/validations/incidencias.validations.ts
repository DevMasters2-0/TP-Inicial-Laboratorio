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
      incidencia_id,
      nombre,
      email,
    } = req.body;
  
    // Create an array to store errors
    const errors = [];
  
    // Valincidencia_idate data
    if (!incidencia_id) {
      errors.push('incidencia_id is required');
    }
  
    if (!nombre) {
      errors.push('nombre is required');
    }
  
    if (!email) {
      errors.push('email is required');
    }
  
    // If there are errors
    // return 422 (Unprocessable Entity)
    if (errors.length) {
      return res.status(422).json({
        message: 'incidencia validation failed',
        errors,
      });
    }
  
    // Pass Incincidencia_idencia data to the next mincidencia_iddleware
    next();
  };