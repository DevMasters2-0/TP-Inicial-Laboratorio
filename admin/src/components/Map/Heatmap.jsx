// Heatmap.js
import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Asegúrate de importar el CSS de Leaflet
import 'leaflet.heat'; // Importa la funcionalidad del plugin leaflet.heat
import './mapcomponent.css';
import calcularNivelRiesgo from '../../utils/calcularNivelRiesgo';

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
