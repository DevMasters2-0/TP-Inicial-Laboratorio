import { Router, Request, Response } from 'express';
import { loginController } from '../controllers/autenticacion.controllers';

// New Router instance
const router = Router();

// login routes
router.post('/login', loginController);

export default router;