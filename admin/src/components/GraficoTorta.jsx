import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// Define colores específicos para cada tema
const COLORS = {
    'piso roto': '#FF8042', // color para "piso roto"
    'calle': '#00C49F',    // color para "calle"
    'alumbrado': '#0088FE'  // color para "alumbrado"
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const GraficoTorta = () => {
    const [data, setData] = useState([]);

    // Fetch incidencias from API
    const fetchIncidencias = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/incidencias`);
            const incidencias = response.data.Incidencias;

            // Count incidencias by tema
            const temaCount = incidencias.reduce((acc, incidencia) => {
                if (incidencia.tema in acc) {
                    acc[incidencia.tema] += 1;
                } else {
                    acc[incidencia.tema] = 1;
                }
                return acc;
            }, {});

            // Convert to the format required by the Pie chart
            const dataArray = Object.keys(temaCount).map(key => ({
                name: key,
                value: temaCount[key]
            }));

            setData(dataArray);
        } catch (error) {
            console.error('Error fetching incidencias:', error);
        }
    };

    useEffect(() => {
        fetchIncidencias();
    }, []);

    return (
            <PieChart width={400} height={400}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[entry.name] || '#8884d8'} // Use color for each theme or a default color
                        />
                    ))}
                </Pie>
            </PieChart>
    );
};

export default GraficoTorta;
