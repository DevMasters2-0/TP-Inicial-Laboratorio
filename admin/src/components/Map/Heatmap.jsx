// Heatmap.js
import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Asegúrate de importar el CSS de Leaflet
import 'leaflet.heat'; // Importa la funcionalidad del plugin leaflet.heat
import './mapcomponent.css';
import calcularNivelRiesgo from '../../utils/calcularNivelRiesgo';

export const heatmapData = [
];


const Heatmap = ({ data=heatmapData }) => {
  useEffect(() => {
    // Inicializar el mapa
    const map = L.map('map').setView([-34.55, -58.74], 13); // Coordenadas aproximadas para José C. Paz

    // Agregar una capa base
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Convertir los datos a formato adecuado para la capa de heatmap
    const heatmapPoints = data.map(incidencia => {
      const nivelRiesgo = calcularNivelRiesgo(incidencia);
      return [
        incidencia.latitud,
        incidencia.longitud,
        nivelRiesgo !== undefined && nivelRiesgo !== null ? nivelRiesgo : 0 
      ];
    });

    // Agregar la capa de heatmap
    L.heatLayer(heatmapPoints, {
      radius: 50, // Ajusta el radio según tus necesidades
      blur: 10, // Ajusta el difuminado
      maxZoom: 17 // Ajusta el zoom máximo
    }).addTo(map);

    // Limpiar el mapa al desmontar el componente
    return () => {
      map.remove();
    };
  }, [data]); // Dependencia en 'data'

  return (
    <div id="map" className='mapa'></div>
  );
};

export default Heatmap;
