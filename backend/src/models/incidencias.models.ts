import { Estado, Localidad, NivelDeRiesgo, Tema } from "./estados.models";

export interface Incidencia {
    id: number;
    nombre: string;
    dni: string;
    email: string;
    tema: Tema;
    nivelDeRiesgo: NivelDeRiesgo | string;
    localidad: Localidad;
    descripcion: string;
    fechaDeCreacion: Date;
    ubicacion: {
      latitud: number;
      longitud: number;
    };
    estado: Estado ; 
}


const incidencias: Array<Incidencia> = [
  {
    id: 1,
    nombre: 'Juan Pérez',
    dni: '12345678A',
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
    dni: '87654321B',
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
    dni: '13579246C',
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
    dni: '23456789B',
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
  
  export const getIncidencias = (): Array<Incidencia> => {
    return incidencias;
  };
  
  export const getIncidenciaById = (id: number): Incidencia | undefined => {
    return incidencias.find(incidencia => incidencia.id === id);
  };
  
  export const createIncidencia = (incidencia: Incidencia): void => {
    incidencias.push(incidencia);
  };
  
  export const updateIncidencia = (incidencia: Incidencia): void => {
    const index = incidencias.findIndex(u => u.id === incidencia.id);
    incidencias[index] = incidencia;
  };
  
  export const deleteIncidencia = (id: number): void => {
    const index = incidencias.findIndex(u => u.id === id);
    incidencias.splice(index, 1);
  };