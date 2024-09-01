import React from 'react';
import './App.css';
import MapComponent from './components/Map/MapComponent';
import axios from 'axios';
import Incidencia from './components/Incidencia/Incidencia';
import Heatmap from './components/Map/Heatmap'; 

// heatmapData.js
export const heatmapData = [
  // Generamos una gran cantidad de puntos en un rango alrededor de José C. Paz
  { lat: -34.5500, lng: -58.7400, intensity: 1 },
  { lat: -34.5505, lng: -58.7405, intensity: 1 },
  { lat: -34.5510, lng: -58.7410, intensity: 1 },
  { lat: -34.5515, lng: -58.7415, intensity: 1 },
  { lat: -34.5520, lng: -58.7420, intensity: 1 },
  { lat: -34.5525, lng: -58.7425, intensity: 1 },
  { lat: -34.5530, lng: -58.7430, intensity: 1 },
  { lat: -34.5535, lng: -58.7435, intensity: 1 },
  { lat: -34.5540, lng: -58.7440, intensity: 1 },
  { lat: -34.5545, lng: -58.7445, intensity: 1 },
  { lat: -34.5550, lng: -58.7450, intensity: 1 },
  { lat: -34.5555, lng: -58.7455, intensity: 1 },
  { lat: -34.5560, lng: -58.7460, intensity: 1 },
  { lat: -34.5565, lng: -58.7465, intensity: 1 },
  { lat: -34.5570, lng: -58.7470, intensity: 1 },
  { lat: -34.5575, lng: -58.7475, intensity: 1 },
  { lat: -34.5580, lng: -58.7480, intensity: 1 },
  { lat: -34.5585, lng: -58.7485, intensity: 1 },
  { lat: -34.5590, lng: -58.7490, intensity: 1 },
  { lat: -34.5595, lng: -58.7495, intensity: 1 },
  { lat: -34.5600, lng: -58.7500, intensity: 1 },
  { lat: -34.5605, lng: -58.7505, intensity: 1 },
  { lat: -34.5610, lng: -58.7510, intensity: 1 },
  { lat: -34.5615, lng: -58.7515, intensity: 1 },
  // Continúa generando más puntos según sea necesario
];


function App() {
  const [mapView, setMapView] = React.useState(true);

  const handleChange = (flag) => {
    return () => setMapView(flag);
  };

  const [incidencias, setIncidencias] = React.useState([]);


  React.useEffect(() => {
    const fetchIncidencias = async () => {
      const response = await axios.get(`http://${import.meta.env.VITE_IP}/incidencias`);
      setIncidencias(response.data.Incidencias);
    };

    fetchIncidencias();
  }, [])

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
            <li onClick={handleChange(true)}>Dashboard</li>
            <li onClick={handleChange(false)}>Incidencias</li>
            <li>Cerrar Sesión</li>
          </ul>
          <button className="cerrar-left-menu">
            &lt;
          </button>
        </div>
        <div className="content">
          {mapView ? (
            <div className="map-container">
              <Heatmap data={heatmapData}/>
            </div>
          ) : (
            <div className="incidencias-container">
              <div className="campos-list">
                <div className="incidencia-nombre">
                  NOMBRE
                </div>
                <div className="incidencia-localidad">
                  LOCALIDAD
                </div>
                <div className="incidencia-riesgo">RIESGO</div>
                <div className="incidencia-estado">ESTADO</div>
                <div className="incidencia-detalle">
                </div>
              </div>
              <div className="incidencias-list">
                <div className="incidencia">
                  <div className="incidencia-nombre">
                    Incidencia
                  </div>
                  <div className="incidencia-localidad">
                    Jose C Paz
                  </div>
                  <div className="incidencia-riesgo">ALTO</div>
                  <div className="incidencia-estado">En Revisión</div>
                  <div className="incidencia-detalle">
                    <div className="boton-detalle">+</div>
                  </div>
                </div>
                {incidencias.length > 0 ? (
                  incidencias.map(incidencia => (
                    <Incidencia key={incidencia.id} props={incidencia} />
                  ))
                ) : (
                  <p>No hay incidencias disponibles</p>
                )}
              </div>
            </div>

          )}
        </div>
      </div>
    </>
  );
}

export default App;
