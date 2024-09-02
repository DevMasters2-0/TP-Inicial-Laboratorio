import { Request, Response } from 'express';
import {
    Incidencia,
    getIncidencias,
    getIncidenciaById,
    createIncidencia,
    IncidenciaCreateDTO
} from '../models/incidencias.models';
import { Estado, Localidad, NivelDeRiesgo, Tema } from '../models/estados.models';
import db from '../database/connection';

// *** Manipular base de datos ***
export const getIncidenciasController = async (req: Request, res: Response): Promise<void> => {
    const Incidencias: Incidencia[] = await db.getIncidencias();
    res.status(200).json({ Incidencias });
};

export const getIncidenciaByIdController = async (req: Request, res: Response): Promise<void> => {
    const id: number = parseInt(req.params.id, 10);
    const Incidencia: Incidencia | undefined = await getIncidenciaById(id);
    if (Incidencia) {
        res.status(200).json({ Incidencia });
    } else {
        res.status(404).json({ message: 'Incidencia not found' });
    }
};

export const createIncidenciaController = (req: Request, res: Response): void => {
   
    const incidencia: IncidenciaCreateDTO = req.body;
    const incidenciaCreated: Incidencia = createIncidencia(incidencia);

    db.crearIncidencia(incidenciaCreated);
    res.status(201).json({
        message: 'Incidencia created',
        incidenciaCreated,
    });
    
};

export const updateIncidenciaController = (req: Request, res: Response): void => {
    const id: number = parseInt(req.params.id, 10);
    const IncidenciaUpdate: Incidencia = req.body;
    IncidenciaUpdate.id = id;
    db.updateIncidenciaById(id, IncidenciaUpdate)
    res.status(200).json({
        message: 'Incidencia updated',
        Incidencia: IncidenciaUpdate,
    });
};

export const deleteIncidenciaController = (req: Request, res: Response): void => {
    const id: number = parseInt(req.params.id, 10);
    db.deleteIncidenciaById(id);
    res.status(200).json({
        message: `Incidencia ${id} deleted`,
    });
};

export async function getIncidenciasByFecha(req: Request, res: Response){
    
    let fecha = req.params.fecha;
    let incidencias: Incidencia[] = await db.obtenerIncidenciasPorFecha(fecha);

    if (incidencias.length === 0){
        res.status(204).send(); //no content
    }
    else {
        res.status(200).json({ incidencias });
    } 

};

// *** Envio de enums ***

export const getTemasController = (req: Request, res: Response): void => {
    const temas = Object.values(Tema);
    res.status(200).json({ temas });
};


export const getNivelesDeRiesgoController = (req: Request, res: Response): void => {
    const nivelesDeRiesgo = Object.values(NivelDeRiesgo);
    res.status(200).json({ nivelesDeRiesgo });
};

export const getLocalidadesController = (req: Request, res: Response): void => {
    const localidades = Object.values(Localidad);
    res.status(200).json({ localidades });
};

export const getEstadosController = (req: Request, res: Response): void => {
    const estados = Object.values(Estado);
    res.status(200).json({ estados });
};

// Filtros
export const getIncidenciasByTemaController = async (req: Request, res: Response): Promise<void> => {
    const tema = req.params.tema as Tema;
    const incidencias: Incidencia[] = await db.getIncidenciasByTema(tema);
   
    if (incidencias.length === 0){
        res.status(204).send(); //no content
    }
    else {
        res.status(200).json({ incidencias });
    } 
   
  };

export const getIncidenciasByRiesgoController = async (req: Request, res: Response): Promise<void> => {
    const nivelDeRiesgo = req.params.nivelDeRiesgo as NivelDeRiesgo;
    const incidencias: Incidencia[] = await db.getIncidenciasByRiesgo(nivelDeRiesgo);
   
    if (incidencias.length === 0){
        res.status(204).send(); //no content
    }
    else {
        res.status(200).json({ incidencias });
    } 
  };

export const getIncidenciasByLocalidadController = async (req: Request, res: Response): Promise<void> => {
    const localidad = req.params.localidad as Localidad;
    const incidencias: Incidencia[] = await db.getIncidenciasByLocalidad(localidad);
   
    if (incidencias.length === 0){
        res.status(204).send(); //no content
    }
    else {
        res.status(200).json({ incidencias });
    } 
  };

export const getIncidenciasByEstadoController = async (req: Request, res: Response): Promise<void> => {
    const estado = req.params.estado as Estado;
    const incidencias: Incidencia[] = await db.getIncidenciasByEstado(estado);
   
    if (incidencias.length === 0){
        res.status(204).send(); //no content
    }
    else {
        res.status(200).json({ incidencias });
    } 
  };

