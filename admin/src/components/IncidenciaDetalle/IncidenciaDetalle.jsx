import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './IncidenciaDetalle.css';
import { useNavigate, useParams } from 'react-router-dom';

const IncidenciaDetalle = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [incidencia, setIncidencia] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchIncidencia = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/incidencias/${id}`);
                setIncidencia(response.data.Incidencia);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchIncidencia();
        }
    }, [id]);

    const onBack = () => {
        navigate("/admin/incidencias");
    };

    if (loading) {
        return <div className='text-error-not-found'>Cargando...</div>;
    }

    if (error) {
        return <div className='text-error-not-found'>Error: {error.message}</div>;
    }

    if (!incidencia) {
        return <div>No se encontró la incidencia</div>;
    }

    return (
        <div className="incidencias-container-modal">
            <div className="incidencia-modal">
                <div className="detalle">
                    <div className="campo-container">
                        <div className="campo">ID</div>
                        <div className="dato">{incidencia.incidencia_id}</div>

                    </div>
                    <div className="campo-container">
                        <div className="campo">NOMBRE</div>
                        <div className="dato">{incidencia.nombre}</div>
                    </div>
                    <div className="campo-container">
                        <div className="campo">DNI</div>
                        <div className="dato">{incidencia.dni}</div>
                    </div>
                    <div className="campo-container">
                        <div className="campo">EMAIL</div>
                        <div className="dato">{incidencia.email}</div>
                    </div>
                    <div className="campo-container">
                        <div className="campo">TEMA</div>
                        <div className="dato">{capitalize(incidencia.tema)}</div>
                    </div>
                    <div className="campo-container">
                        <div className="campo">RIESGO</div>
                        <div className="dato">{capitalize(incidencia.nivelDeRiesgo)}</div>
                    </div>
                    <div className="campo-container">
                        <div className="campo">LOCALIDAD</div>
                        <div className="dato">{capitalize(incidencia.localidad)}</div>
                    </div>
                    <div className="campo-container">
                        <div className="campo">ESTADO</div>
                        <div className="dato">{incidencia.estado.toUpperCase()}</div>
                    </div>
                    <div className="campo-container">
                        <div className="campo">DESCRIPCION</div>
                        <div className="dato" style={{maxWidth: '200px'}}>{incidencia.descripcion}</div>
                    </div>

                    <div className="campo-container">
                        <div className="campo">FECHA DE CREACION</div>
                        <div className="dato">{formatDate(incidencia.fechaDeCreacion)}</div>
                    </div>
                </div>
                {incidencia.image_url && (
                    <div className="imagen-container">
                        <img src={incidencia.image_url} alt="Imagen de Incidencia" style={{ width: '100%', borderRadius: '0.4rem' }} />
                    </div>
                )}
            </div>
            <div className='centrar-boton'>
                <button onClick={onBack} id='boton-volver'>Volver</button>
            </div>
        </div>
    );
};

const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
};

const capitalize = (pal) => {
    if (!pal) {
        return pal;
    }
    return pal.charAt(0).toUpperCase() + pal.slice(1).toLowerCase();
};

export default IncidenciaDetalle;
