import React from 'react';
import './App.css';
import MapComponent from './components/Map/MapComponent';
import { MapContainer, TileLayer } from 'react-leaflet';

function App() {
  return (
    <>
      <header>
        <h1>NMS</h1>
        <div className="nombre">
          <p><strong>David Cañete</strong></p>
        </div>
      </header>
      <div className='divisor-container'>
        <div className='left-menu'>
          <ul>
            <li>Dashboard</li>
            <li>Cerrar Sesión</li>
          </ul>
          <button className="cerrar-left-menu">
            &lt;
          </button>
        </div>
        <div className="content">
          <div className="map-container">
            <MapComponent />
          </div>

        </div>
      </div>
    </>
  );
}

export default App;
