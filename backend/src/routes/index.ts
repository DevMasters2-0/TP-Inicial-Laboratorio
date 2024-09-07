import { Router } from 'express';
import homeRouter from './home.routes';

import incidenciasRouter from './incidencias.routes';
import autenticacionRouter from './autenticacion.routes';

// Create a new Router instance
const router = Router();

// Mount the routers
router.use('/', homeRouter);
router.use('/incidencias', incidenciasRouter);
router.use('/auth', autenticacionRouter);

export default router;