import {
    Request,
    Response,
    NextFunction
  } from 'express';

import { Estado, Tema } from "../../models/estados.models";

  export const validateUpdateIncidencia= (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    const {
      tema,
      estado
    } = req.body;

    const errors = [];

    if (!req.params.id) {
      errors.push('incidencia_id is required');
    }

    if (!Object.values(Tema).includes(tema)) {
      errors.push('tema is required');
    }

    if (!Object.values(Estado).includes(estado)) {
      errors.push('estado is required');
    }

    console.log(tema);
    console.log(estado);
    if (errors.length) {
      return res.status(422).json({
        message: 'incidencia validation failed',
        errors,
      });
    }
  
    // Pass Incincidencia_idencia data to the next mincidencia_iddleware
    next();

  }



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