import { Router, Request, Response } from 'express';
import { createIncidenciaController, deleteIncidenciaController, getEstadosController, 
    getIncidenciaByIdController, getIncidenciasByEstadoController, getIncidenciasByLocalidadController,
    getIncidenciasByRiesgoController, getIncidenciasByTemaController, getIncidenciasController, getLocalidadesController, 
    getNivelesDeRiesgoController, getTemasController, updateIncidenciaController } from '../controllers/incidencias.controllers';
import { validateIncidencia } from '../utils/validations/incidencias.validations';

// New Router instance
const router = Router();

// Incidencias routes
router.get('/', getIncidenciasController);
router.get('/:id', getIncidenciaByIdController);
router.post(
  '/', 
  validateIncidencia, 
  createIncidenciaController 
);
router.put(
  '/:id', 
  validateIncidencia,
  updateIncidenciaController
);
router.delete('/:id', deleteIncidenciaController);

// Filtros
router.get('/incidencias/tema/:tema', getIncidenciasByTemaController);
router.get('/incidencias/riesgo/:nivelDeRiesgo', getIncidenciasByRiesgoController);
router.get('/incidencias/localidad/:localidad', getIncidenciasByLocalidadController);
router.get('/incidencias/estado/:estado', getIncidenciasByEstadoController);

// Valores por defecto que tienen
router.get('/temas', getTemasController);
router.get('/niveles-de-riesgo', getNivelesDeRiesgoController);
router.get('/localidades', getLocalidadesController);
router.get('/estados', getEstadosController);

export default router;