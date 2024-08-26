import React from 'react';
import './App.css';
import MapComponent from './components/Map/MapComponent';
import axios from 'axios';
import Incidencia from './components/Incidencia/Incidencia';

function App() {
  const [mapView, setMapView] = React.useState(false);

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
              <MapComponent />
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
