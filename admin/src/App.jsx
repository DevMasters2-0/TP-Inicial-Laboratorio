import React from 'react';
import './App.css';
import MapComponent from './components/Map/MapComponent';
import axios from 'axios';
import Incidencia from './components/Incidencia/Incidencia';
import Heatmap from './components/Map/Heatmap'; 
import IncidenciaDetalle  from './components/IncidenciaDetalle/IncidenciaDetalle';

// heatmapData.js
export const heatmapData = [
  // Generamos una gran cantidad de puntos en un rango alrededor de José C. Paz
  { latitud: -34.5500, longitud: -58.7400,nivelDeRiesgo: "alto" },
  { latitud: -34.5505, longitud: -58.7405,nivelDeRiesgo: "bajo" },
  { latitud: -34.5510, longitud: -58.7410,nivelDeRiesgo: "alto" },
  { latitud: -34.5515, longitud: -58.7415,nivelDeRiesgo: "alto" },
  { latitud: -34.5520, longitud: -58.7420,nivelDeRiesgo: "bajo" },
  { latitud: -34.5525, longitud: -58.7425,nivelDeRiesgo: "alto" },
  { latitud: -34.5530, longitud: -58.7430,nivelDeRiesgo: "alto" },
  { latitud: -34.5535, longitud: -58.7435,nivelDeRiesgo: "bajo" },
  { latitud: -34.5540, longitud: -58.7440,nivelDeRiesgo: "alto" },
  { latitud: -34.5545, longitud: -58.7445,nivelDeRiesgo: "alto" },
  { latitud: -34.5550, longitud: -58.7450,nivelDeRiesgo: "bajo" },
  { latitud: -34.5555, longitud: -58.7455,nivelDeRiesgo: "alto" },
  { latitud: -34.5560, longitud: -58.7460,nivelDeRiesgo: "moderado" },
  { latitud: -34.5565, longitud: -58.7465,nivelDeRiesgo: "alto" },
  { latitud: -34.5570, longitud: -58.7470,nivelDeRiesgo: "alto" },
  { latitud: -34.5575, longitud: -58.7475,nivelDeRiesgo: "bajo" },
  { latitud: -34.5580, longitud: -58.7480,nivelDeRiesgo: "alto" },
  { latitud: -34.5585, longitud: -58.7485,nivelDeRiesgo: "bajo" },
  { latitud: -34.5590, longitud: -58.7490,nivelDeRiesgo: "alto" },
  { latitud: -34.5595, longitud: -58.7495,nivelDeRiesgo: "bajo" },
  { latitud: -34.5600, longitud: -58.7500,nivelDeRiesgo: "alto" },
  { latitud: -34.5605, longitud: -58.7505,nivelDeRiesgo: "moderado" },
  { latitud: -34.5610, longitud: -58.7510,nivelDeRiesgo: "alto" },
  { latitud: -34.5615, longitud: -58.7515,nivelDeRiesgo: "alto" },
];


function App() {
  const [mapView, setMapView] = React.useState(true); // Esto est mal xd (lo hice yo, se hace con React.Router)

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

  const [selectedIncidencia, setSelectedIncidencia] = React.useState(null);

  const handleSelectIncidencia = (incidencia) => {
    setSelectedIncidencia(incidencia);
  };

  const handleBack = () => {
    setSelectedIncidencia(null);
  };

  return (
    <>
      <header>
        <h1>NMS</h1>
        <div className="nombre">
          <p>
            <strong>David Cañete</strong>
          </p>
        </div>
      </header>
      <div className="divisor-container">
        <div className="left-menu">
          <ul>
            <li onClick={handleChange(true)}>Dashboard</li>
            <li onClick={handleChange(false)}>Incidencias</li>
            <li>Cerrar Sesión</li>
          </ul>
          <button className="cerrar-left-menu">&lt;</button>
        </div>
        <div className="content">
          {mapView ? (
            <div className="map-container">
              <Heatmap data={heatmapData} />
            </div>
          ) : incidencias.length === 0 ? (
            <div className='incidencias-container'>
            <p id='paragraph'>No hay incidencias disponibles</p>
            </div>
          ) : !selectedIncidencia ? (
            <Incidencia
              incidencias={incidencias}
              onDetalleClick={handleSelectIncidencia}
            />
          ) : (
            <IncidenciaDetalle
              incidencia={selectedIncidencia}
              onBack={handleBack}
            />
          )
          }
        </div>
      </div>
    </>
  );
}

export default App;
