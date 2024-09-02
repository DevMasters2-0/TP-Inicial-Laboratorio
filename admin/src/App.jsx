import React from 'react';
import './App.css';
import MapComponent from './components/Map/MapComponent';
import axios from 'axios';
import Incidencia from './components/Incidencia/Incidencia';
import Heatmap from './components/Map/Heatmap'; 

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
