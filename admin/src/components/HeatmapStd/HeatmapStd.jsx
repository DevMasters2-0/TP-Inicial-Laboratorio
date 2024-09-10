import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

// Array with month names
const monthNames = [
  "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO",
  "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"
];

// Function to get month name by number (1-based index)
const getMonthName = (num) => {
  return monthNames[num - 1] || ''; // Adjust for 1-based index
};

// Function to transform data for heatmap
const transformData = (incidencias) => {
  const result = {};

  // Helper function to format date as YYYY-MM
  const formatDate = (date) => {
    const d = new Date(date);
    return { year: d.getFullYear(), month: d.getMonth() + 1 }; // Returns year and month
  };

  incidencias.forEach(({ localidad, fechaDeCreacion }) => {
    const { year, month } = formatDate(fechaDeCreacion);
    const monthName = getMonthName(month);

    if (!result[localidad]) {
      result[localidad] = {};
    }
    if (!result[localidad][monthName]) {
      result[localidad][monthName] = 0;
    }
    result[localidad][monthName] += 1;
  });

  // Convert to format suitable for ApexCharts heatmap
  const series = [];
  const categories = new Set();

  Object.entries(result).forEach(([localidad, months]) => {
    const data = [];
    Object.entries(months).forEach(([monthName, count]) => {
      categories.add(monthName);
      data.push({ x: monthName, y: count });
    });
    series.push({ name: localidad, data });
  });

  return { series, categories: Array.from(categories) };
};

const HeatmapStd = () => {
  const [categories, setCategories] = useState([]);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const fetchIncidencias = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/incidencias`);
        const incidencias = response.data.Incidencias;

        const { series, categories } = transformData(incidencias);
        setSeries(series);
        setCategories(categories);
      } catch (error) {
        console.error('Error fetching incidencias:', error);
      }
    };

    fetchIncidencias();
  }, []); // Empty dependency array means this effect runs once on mount

  const options = {
    chart: {
      height: 350, // Adjusted for better fit
      type: 'heatmap',
    },
    dataLabels: {
      enabled: false
    },
    colors: ["#fb4b00"],
    title: {
      text: 'Incidencias-Mes 2024'
    },
    xaxis: {
      categories: categories,
    },
    yaxis: {
      title: {
        text: 'Localidades'
      }
    },
    legend: {
      show: false // Hide the legend
    }
  };

  return (
    <div className='grafico-heatmap-container'>
      <ReactApexChart options={options} series={series} type="heatmap" height={350} />
    </div>
  );
};

export default HeatmapStd;
