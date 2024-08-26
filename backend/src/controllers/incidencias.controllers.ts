import { Request, Response } from 'express';
import {
    Incidencia,
    getIncidencias,
    getIncidenciaById,
    createIncidencia,
    updateIncidencia,
    deleteIncidencia
} from '../models/incidencias.models';
import { Estado, Localidad, NivelDeRiesgo, Tema } from '../models/estados.models';

export const getIncidenciasController = (req: Request, res: Response): void => {
    const Incidencias: Incidencia[] = getIncidencias();
    res.status(200).json({ Incidencias });
};

export const getIncidenciaByIdController = (req: Request, res: Response): void => {
    const id: number = parseInt(req.params.id, 10);
    const Incidencia: Incidencia | undefined = getIncidenciaById(id);
    if (Incidencia) {
        res.status(200).json({ Incidencia });
    } else {
        res.status(404).json({ message: 'Incidencia not found' });
    }
};

export const createIncidenciaController = (req: Request, res: Response): void => {
    const Incidencia: Incidencia = req.body;
    createIncidencia(Incidencia);
    res.status(201).json({
        message: 'Incidencia created',
        Incidencia,
    });
};

export const updateIncidenciaController = (req: Request, res: Response): void => {
    const id: number = parseInt(req.params.id, 10);
    const IncidenciaUpdate: Incidencia = req.body;
    IncidenciaUpdate.id = id;
    updateIncidencia(IncidenciaUpdate);
    res.status(200).json({
        message: 'Incidencia updated',
        Incidencia: IncidenciaUpdate,
    });
};

export const deleteIncidenciaController = (req: Request, res: Response): void => {
    const id: number = parseInt(req.params.id, 10);
    deleteIncidencia(id);
    res.status(200).json({
        message: `Incidencia ${id} deleted`,
    });
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
export const getIncidenciasByTemaController = (req: Request, res: Response): void => {
    const tema = req.params.tema as Tema;
    const incidencias: Incidencia[] = getIncidencias();
    const filteredIncidencias = incidencias.filter(inc => inc.tema === tema);
    res.status(200).json({ incidencias: filteredIncidencias });
  };

export const getIncidenciasByRiesgoController = (req: Request, res: Response): void => {
    const nivelDeRiesgo = req.params.nivelDeRiesgo as NivelDeRiesgo;
    const incidencias: Incidencia[] = getIncidencias();
    const filteredIncidencias = incidencias.filter(inc => inc.nivelDeRiesgo === nivelDeRiesgo);
    res.status(200).json({ incidencias: filteredIncidencias });
  };

export const getIncidenciasByLocalidadController = (req: Request, res: Response): void => {
    const localidad = req.params.localidad as Localidad;
    const incidencias: Incidencia[] = getIncidencias();
    const filteredIncidencias = incidencias.filter(inc => inc.localidad === localidad);
    res.status(200).json({ incidencias: filteredIncidencias });
  };

export const getIncidenciasByEstadoController = (req: Request, res: Response): void => {
    const estado = req.params.estado as Estado;
    const incidencias: Incidencia[] = getIncidencias();
    const filteredIncidencias = incidencias.filter(inc => inc.estado === estado);
    res.status(200).json({ incidencias: filteredIncidencias });
  };

