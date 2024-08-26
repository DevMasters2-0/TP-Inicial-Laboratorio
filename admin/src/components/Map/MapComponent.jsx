import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './mapcomponent.css';

const MapComponent = () => {
  return (
    <MapContainer center={[-34.5461, -58.6844]} zoom={13} className='mapa'>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

export default MapComponent;
