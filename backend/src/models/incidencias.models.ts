import { Estado, Localidad, NivelDeRiesgo, Tema } from "./estados.models";
import db from '../database/connection';

type Ubicacion = {
  latitud: number,
  longitud: number
}


export interface IncidenciaCreateDTO {
  id:number;
  nombre: string;
  dni: string;
  email: string;
  tema: string;
  nivelDeRiesgo: string;
  localidad: string;
  ubicacion: Ubicacion;
  descripcion: string;
}

export interface Incidencia extends IncidenciaCreateDTO {
    id: number;
    nombre: string;
    dni: string;
    email: string;
    tema: Tema | string;
    nivelDeRiesgo: NivelDeRiesgo | string;
    localidad: Localidad | string;
    descripcion: string;
    fechaDeCreacion: Date | null;
    ubicacion: {
      latitud: number;
      longitud: number;
    };  
    estado: Estado; 
}

  export const getIncidencias = async (): Promise<Array<Incidencia>> => {
    let result = await db.getIncidencias();
    return result;
  };

  
  export const  getIncidenciaById = async (id: number): Promise<Incidencia | undefined> => {
    return db.getIncidenciaById(id);
  };

  export const createIncidencia = (incidencia: IncidenciaCreateDTO): Incidencia => {
    const incidenciaCreated: Incidencia = {
      ...incidencia,
      id: incidencia.id, 
      fechaDeCreacion: new Date(),
      estado: Estado.EN_REVISION,
    };
  
    return incidenciaCreated;
  };
  
