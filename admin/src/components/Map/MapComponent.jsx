import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './mapcomponent.css';

// Componente MapComponent
const MapComponent = ({ puntos }) => {
  return (
    <MapContainer center={[-34.5461, -58.6844]} zoom={13} className='mapa'>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {puntos.map((incidencia) => {
        const fechaDeCreacion = incidencia.fechaDeCreacion instanceof Date
          ? incidencia.fechaDeCreacion
          : new Date(incidencia.fechaDeCreacion);

        return (
          <Marker
            key={incidencia.id}
            position={[incidencia.ubicacion.latitud, incidencia.ubicacion.longitud]}
          >
            <Popup>
              <strong>{incidencia.nombre}</strong><br />
              {incidencia.descripcion}<br />
              <em>{fechaDeCreacion.toLocaleDateString()}</em>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapComponent;
