import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './mapcomponent.css';


// Ejemplo de lista de incidencias
const incidencias = [
  {
    id: 1,
    nombre: 'Ana Fernández',
    dni: '23456789B',
    email: 'ana.fernandez@ungs.edu.ar',
    tema: 'PLATAFORMA_E_LEARNING', // Asegúrate de que esto sea una cadena válida según tu definición
    nivelDeRiesgo: 'ALTO', // Asegúrate de que esto sea una cadena válida según tu definición
    localidad: 'UNGS', // Ajusta esto según tu enumeración
    descripcion: 'Varios estudiantes y docentes están experimentando tiempos de carga excesivos y errores al intentar acceder a los recursos educativos en la plataforma de e-learning.',
    fechaDeCreacion: new Date(),
    ubicacion: {
      latitud: -34.522222, 
      longitud: -58.7,
    },
    estado: 'EN_REVISION', // Asegúrate de que esto sea una cadena válida según tu definición
  },
  // Puedes añadir más incidencias aquí
];

const MapComponent = () => {
  return (
    <MapContainer center={[-34.5461, -58.6844]} zoom={13} className='mapa'>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {incidencias.map((incidencia) => (
        <Marker
          key={incidencia.id}
          position={[incidencia.ubicacion.latitud, incidencia.ubicacion.longitud]}
        >
          <Popup>
            <strong>{incidencia.nombre}</strong><br />
            {incidencia.descripcion}<br />
            <em>{incidencia.fechaDeCreacion.toLocaleDateString()}</em>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
