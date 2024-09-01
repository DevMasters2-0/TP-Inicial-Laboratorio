import { Estado, Localidad, NivelDeRiesgo, Tema } from "./estados.models";
import db from '../database/connection';

type Ubicacion = {
  latitud: number,
  longitud: number
}


export interface IncidenciaCreateDTO {
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


const incidencias: Array<Incidencia> = [
  {
    id: 1,
    nombre: 'Juan Pérez',
    dni: '12345678',
    email: 'juan.perez@test.com',
    tema: Tema.PISO_ROTO,
    nivelDeRiesgo: NivelDeRiesgo.MODERADO,
    localidad: Localidad.SAN_MIGUEL,
    descripcion: 'El piso de la cocina está roto y necesita reparación.',
    fechaDeCreacion: new Date(),
    ubicacion: {
      latitud: -34.5898,
      longitud: -58.4444,
    },
    estado: Estado.EN_REVISION, // Valor para el estado
  },
  {
    id: 2,
    nombre: 'Ana Gómez',
    dni: '87654321',
    email: 'ana.gomez@test.com',
    tema: Tema.CALLE,
    nivelDeRiesgo: NivelDeRiesgo.BAJO,
    localidad: Localidad.POLVORINES,
    descripcion: 'La calle necesita limpieza.',
    fechaDeCreacion: new Date(),
    ubicacion: {
      latitud: -34.5900,
      longitud: -58.4450,
    },
    estado: Estado.COMPLETADO, // Valor para el estado
  },
  {
    id: 3,
    nombre: 'Luis Fernández',
    dni: '13579246',
    email: 'luis.fernandez@test.com',
    tema: Tema.ALUMBRADO,
    nivelDeRiesgo: NivelDeRiesgo.URGENTE,
    localidad: Localidad.JOSE_C_PAZ,
    descripcion: 'El alumbrado público no funciona en la calle principal.',
    fechaDeCreacion: new Date(),
    ubicacion: {
      latitud: -34.5902,
      longitud: -58.4460,
    },
    estado: Estado.ANULADO, // Valor para el estado
  },
  {
    id: 4,
    nombre: 'Ana Fernández',
    dni: '23456789',
    email: 'ana.fernandez@ungs.edu.ar',
    tema: Tema.PISO_ROTO, // Valor para el tema relacionado con la plataforma e-learning
    nivelDeRiesgo: NivelDeRiesgo.MODERADO, // Se considera alto debido al impacto en la educación
    localidad: Localidad.POLVORINES, 
    descripcion: 'Varios estudiantes y docentes están experimentando tiempos de carga excesivos y errores al intentar acceder a los recursos educativos en la plataforma de e-learning.',
    fechaDeCreacion: new Date(),
    ubicacion: {
      latitud: -34.5898, 
      longitud: -58.4444,
    },
    estado: Estado.EN_REVISION, // Valor para el estado actual de la incidencia
  }
];  
  
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
      id: 10, 
      fechaDeCreacion: new Date(),
      estado: Estado.EN_REVISION,
    };
    incidencias.push(incidenciaCreated);
    return incidenciaCreated;
  };
  
  export const updateIncidencia = (incidencia: Incidencia): void => {
    const index = incidencias.findIndex(u => u.id === incidencia.id);
    incidencias[index] = incidencia;
  };
  
  export const deleteIncidencia = (id: number): void => {
    const index = incidencias.findIndex(u => u.id === id);
    incidencias.splice(index, 1);
  };