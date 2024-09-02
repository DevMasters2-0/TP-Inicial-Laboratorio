import {
    Request,
    Response,
    NextFunction
  } from 'express';

import { Estado, Tema, NivelDeRiesgo } from '../../models/estados.models';

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
      id,
      nombre,
      email,
      tema,
      estado,
      nivelDeRiesgo,
      localidad,
      descripcion,
      fechaDeCreacion
    } = req.body;
  
    // Create an array to store errors
    const errors = [];
  
    // Valincidencia_idate data
    if (!id) {
      errors.push('incidencia_id is required');
    }
  
    if (!nombre) {
      errors.push('nombre is required');
    }
  
    if (!email) {
      errors.push('email is required');
    }
  
    if(!tema) errors.push('tema is required');
    if(!estado) errors.push('estado is required');
    if(!nivelDeRiesgo) errors.push('nivel de riesgo is required');
    if(!localidad) errors.push('localidad is required');
    if(!descripcion) errors.push('descripcion is required');
    if(!fechaDeCreacion) errors.push('fecha de creacion is required');

    // If there are errors
    // return 422 (Unprocessable Entity)
    if (errors.length) {
      return res.status(422).json({
        message: 'incidencia validation failed',
        errors,
      });
    }
  
    
    next();
  };