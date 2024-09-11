import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Heatmap from './Map/Heatmap';
import 'flatpickr/dist/flatpickr.css'; // Importa el CSS para flatpickr
import flatpickr from 'flatpickr';
import GraficoTorta from './GraficoTorta';
import HeatmapStd from './HeatmapStd/HeatmapStd';

const MapaPage = () => {
  const [incidencias, setIncidencias] = useState([]);
  const [filteredIncidencias, setFilteredIncidencias] = useState([]);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  // Fetch all incidencias on component mount
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

  // Filter incidencias when date range changes
  useEffect(() => {
    if (fechaInicio && fechaFin) {
      const filterDataByDate = (data, startDate, endDate) => {
        return data.filter(d => {
          const date = new Date(d.fechaDeCreacion); // Asegúrate de usar el campo correcto
          return date >= new Date(startDate) && date <= new Date(endDate);
        });
      };

      const filtered = filterDataByDate(incidencias, fechaInicio, fechaFin);
      setFilteredIncidencias(filtered);
    } else {
      setFilteredIncidencias(incidencias); // Muestra todas las incidencias si no hay filtro
    }
  }, [fechaInicio, fechaFin, incidencias]);

  // Initialize flatpickr date pickers
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

  // Handler to reset date filters
  const handlerRestaurar = () => {
    setFechaInicio('');
    setFechaFin('');
    setFilteredIncidencias(incidencias); // Reset to show all incidencias
  };

  return (
    <>
      <Heatmap data={filteredIncidencias} />
      <div className='filtrado-fecha-container'>
        <input
          style={{ padding: '0.5rem' }}
          type="text"
          id="startDate"
          placeholder="Fecha de Inicio"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
        />
        <input
          style={{ padding: '0.5rem' }}
          type="text"
          id="endDate"
          placeholder="Fecha de Fin"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
        />
        <button id='restaurar-filtrado-fecha-btn' onClick={handlerRestaurar}>Restaurar</button>
      </div>
      <div className='graficos-container'>
        <div className="grafico-torta-container">
          <div className="detalle-grafico">
            <p style={{ color: '#FF8042' }}>PISO ROTO</p>
            <p style={{ color: '#00C49F' }}>CALLE</p>
            <p style={{ color: '#0088FE' }}>ALUMBRADO</p>
          </div>
          <GraficoTorta />
        </div>
        <div className='grafico-heatmap-container'>
          <HeatmapStd />
        </div>
      </div>
    </>
  );
};

export default MapaPage;
