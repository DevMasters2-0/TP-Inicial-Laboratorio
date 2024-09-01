import { Router, Request, Response } from 'express';
import { createIncidenciaController, deleteIncidenciaController, getEstadosController, 
    getIncidenciaByIdController, getIncidenciasByEstadoController, getIncidenciasByLocalidadController,
    getIncidenciasByRiesgoController, getIncidenciasByTemaController, getIncidenciasController, getLocalidadesController, 
    getNivelesDeRiesgoController, getTemasController, updateIncidenciaController, getIncidenciasByFecha } from '../controllers/incidencias.controllers';
import { validateIncidencia,  validateUpdateIncidencia } from '../utils/validations/incidencias.validations';

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
router.get("/fechas/:fecha", getIncidenciasByFecha);

// Incidencias routes
router.get('/', getIncidenciasController)
router.get('/:id', getIncidenciaByIdController);
router.delete('/:id', deleteIncidenciaController);

router.post( //create
  '/', 
  createIncidenciaController 
);

router.put( //update
  '/:id', 
  validateUpdateIncidencia,
  updateIncidenciaController
);



export default router;