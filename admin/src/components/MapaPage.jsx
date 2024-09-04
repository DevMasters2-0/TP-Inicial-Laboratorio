import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Heatmap from './Map/Heatmap';

const MapaPage = () => {
  const [incidencias, setIncidencias] = useState([]);

  useEffect(() => {
    const fetchHeatmapData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/incidencias`);
        setIncidencias(response.data.Incidencias);
      } catch (error) {
        console.error('Error fetching incidencias:', error);
      }
    };

    fetchHeatmapData();
  }, []);

  return (
    <Heatmap data={incidencias} />
  );
};

export default MapaPage;
