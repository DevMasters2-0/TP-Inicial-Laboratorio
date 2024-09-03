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
  fechaDeCreacion: Date | null;
  descripcion: string;
  image_url: string | null;
}

export interface Incidencia extends IncidenciaCreateDTO {
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
    image_url: string | null;
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
      fechaDeCreacion: new Date(),
      estado: Estado.EN_REVISION,
      image_url: incidencia.image_url
    };
  
    return incidenciaCreated;
  };
  
