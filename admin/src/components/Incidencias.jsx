import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Asegúrate de importar axios
import { useNavigate } from 'react-router';

export const Incidencias = () => {
    const navigate = useNavigate();
    const [incidencias, setIncidencias] = useState([]);

    useEffect(() => {
        const fetchIncidencias = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/incidencias`);
                setIncidencias(response.data.Incidencias);
            } catch (error) {
                console.error('Error fetching incidencias:', error);
            }
        };
        fetchIncidencias();
    }, []);

    const onDetalleClick = (incidencia) => {
        navigate(`/admin/incidencias/${incidencia.incidencia_id}`)
    };

    return (
        <div className='incidencias-container'>
            {incidencias.length === 0 ? (
                <p>No hay incidencias para mostrar</p>
            ) : (
                <>
                    <div className="campos-list">
                        <div className="incidencia-nombre">NOMBRE</div>
                        <div className="incidencia-localidad">LOCALIDAD</div>
                        <div className="incidencia-riesgo">RIESGO</div>
                        <div className="incidencia-estado">ESTADO</div>
                        <div className="incidencia-detalle"> INGRESAR AL DETALLE </div>
                    </div>

                    <div className="incidencias-list">
                        {incidencias.map((incidencia) => (
                            <div className='incidencia' key={incidencia.incidencia_id}>
                                <div className="incidencia-nombre">
                                    {incidencia.nombre}
                                </div>
                                <div className="incidencia-localidad">
                                    {incidencia.localidad}
                                </div>
                                <div className="incidencia-riesgo">{incidencia.nivelDeRiesgo.toUpperCase()}</div>
                                <div className="incidencia-estado">{incidencia.estado}</div>
                                <div className='incidencia-detalle'>
                                    <button onClick={() => onDetalleClick(incidencia)} className='boton-detalle'>+</button>
                                </div>
                            </div>
                        ))}
                    </div>

                </>
            )}
        </div>
    );
};
