import { Router, Request, Response } from 'express';
import { loginController, createController } from '../controllers/autenticacion.controllers';
import { validateUser } from '../utils/validations/users.validations';

// New Router instance
const router = Router();

// login routes
router.post('/login', loginController);
router.post('/create', createController);


export default router;