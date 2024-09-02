import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Asegúrate de importar axios

export const Incidencias = () => {
  const [incidencias, setIncidencias] = useState([]);

  useEffect(() => {
    const fetchIncidencias = async () => {
      try {
        const response = await axios.get(`http://${import.meta.env.VITE_IP}/incidencias`);
        setIncidencias(response.data.Incidencias);
      } catch (error) {
        console.error('Error fetching incidencias:', error);
        // Manejo de errores (opcional)
      }
    };
    fetchIncidencias();
  }, []);

  const onDetalleClick = (incidencia) => {
    // Lógica para manejar el clic en "Detalle"
    console.log('Detalle clicked:', incidencia);
  };

  return (
    <div className='incidencias-container'>
      {incidencias.length === 0 ? (
        <p>No hay incidencias para mostrar</p>
      ) : (
        incidencias.map((incidencia) => (
          <div className='incidencia' key={incidencia.id}>
            <div className="incidencia-nombre">
              {incidencia.nombre}
            </div>
            <div className="incidencia-localidad">
              {incidencia.localidad}
            </div>
            <div className="incidencia-riesgo">{incidencia.nivelDeRiesgo.toUpperCase()}</div>
            <div className="incidencia-estado">{incidencia.estado}</div>
            <div className='incidencia-detalle'>
              <button onClick={() => onDetalleClick(incidencia)}>Detalle</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
