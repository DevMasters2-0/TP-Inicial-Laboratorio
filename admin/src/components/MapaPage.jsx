import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Heatmap from './Map/Heatmap';
import 'flatpickr/dist/flatpickr.css'; // Importa el CSS para flatpickr
import flatpickr from 'flatpickr';

const MapaPage = () => {
  const [incidencias, setIncidencias] = useState([]);
  const [filteredIncidencias, setFilteredIncidencias] = useState([]);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  useEffect(() => {
    const fetchHeatmapData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/incidencias`);
        setIncidencias(response.data.Incidencias);
        setFilteredIncidencias(response.data.Incidencias); // Inicialmente muestra todas las incidencias
      } catch (error) {
        console.error('Error fetching incidencias:', error);
      }
    };

    fetchHeatmapData();
  }, []);

  useEffect(() => {
    if (fechaInicio && fechaFin) {
      const filterDataByDate = (data, startDate, endDate) => {
        return data.filter(d => {
          const date = new Date(d.date);
          return date >= new Date(startDate) && date <= new Date(endDate);
        });
      };

      const filtered = filterDataByDate(incidencias, fechaInicio, fechaFin);
      setFilteredIncidencias(filtered);
    }
  }, [fechaInicio, fechaFin, incidencias]);

  useEffect(() => {
    flatpickr('#startDate', {
      dateFormat: 'Y-m-d',
      onChange: (selectedDates) => {
        setFechaInicio(selectedDates[0]?.toISOString().split('T')[0] || '');
      }
    });

    flatpickr('#endDate', {
      dateFormat: 'Y-m-d',
      onChange: (selectedDates) => {
        setFechaFin(selectedDates[0]?.toISOString().split('T')[0] || '');
      }
    });
  }, []);

  return (
    <>
      <Heatmap data={filteredIncidencias} />
      <div className='filtrado-fecha-container'>
        <input type="text" id="startDate" placeholder="Fecha de Inicio" />
        <input type="text" id="endDate" placeholder="Fecha de Fin" />
      </div>
    </>
  );
};

export default MapaPage;
