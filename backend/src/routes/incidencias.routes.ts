import { Router, Request, Response } from 'express';
import { createIncidenciaController, deleteIncidenciaController, getEstadosController, 
    getIncidenciaByIdController, getIncidenciasByEstadoController, getIncidenciasByLocalidadController,
    getIncidenciasByRiesgoController, getIncidenciasByTemaController, getIncidenciasController, getLocalidadesController, 
    getNivelesDeRiesgoController, getTemasController, updateIncidenciaController } from '../controllers/incidencias.controllers';
import { validateIncidencia } from '../utils/validations/incidencias.validations';

// New Router instance
const router = Router();

// Valores por defecto que tienen
router.get('/temas', getTemasController);
router.get('/riesgos', getNivelesDeRiesgoController);
router.get('/localidades', getLocalidadesController);
router.get('/estados', getEstadosController);

// Filtros
router.get('/temas/:tema', getIncidenciasByTemaController);
router.get('/riesgos/:nivelDeRiesgo', getIncidenciasByRiesgoController);
router.get('/localidades/:localidad', getIncidenciasByLocalidadController);
router.get('/estados/:estado', getIncidenciasByEstadoController);

// Incidencias routes
router.get('/', getIncidenciasController)
router.post(
  '/', 
  validateIncidencia, 
  createIncidenciaController 
);
router.delete('/', deleteIncidenciaController);
router.get('/:id', getIncidenciaByIdController);
router.put(
  '/:id', 
  validateIncidencia,
  updateIncidenciaController
);

export default router;