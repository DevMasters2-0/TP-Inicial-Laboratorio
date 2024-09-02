import React, { useState, useEffect } from 'react';
import axios from 'axios';  
import './IncidenciaDetalle.css';
import { useLocation, useNavigate, useParams } from 'react-router';

const IncidenciaDetalle = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [incidencia, setIncidencia] = useState(null);  
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);  

    useEffect(() => {
        const fetchIncidencia = async () => {
            try {
                const response = await axios.get(`http://${import.meta.env.VITE_IP}/incidencias/${id}`); 
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
        return <div className='text-error-not-found'>Loading...</div>;  
    }

    if (error) {
        return <div className='text-error-not-found'>Error: {error.message}</div>; 
    }

    if (!incidencia) {
        return <div>No Incidencia found</div>;  
    }

    return (
        <div className="incidencias-container-modal">
            <div className="incidencia-modal">
                <div className="campo">ID</div>
                <div className="dato">{incidencia.incidencia_id}</div>
                <div className="campo">NOMBRE</div>
                <div className="dato">{incidencia.nombre}</div>
                <div className="campo">DNI</div>
                <div className="dato">{incidencia.dni}</div>
                <div className="campo">EMAIL</div>
                <div className="dato">{incidencia.email}</div>
                <div className="campo">TEMA</div>
                <div className="dato">{capitalize(incidencia.tema)}</div>
                <div className="campo">RIESGO</div>
                <div className="dato">{capitalize(incidencia.nivelDeRiesgo)}</div>
                <div className="campo">LOCALIDAD</div>
                <div className="dato">{capitalize(incidencia.localidad)}</div>
                <div className="campo">ESTADO</div>
                <div className="dato">{incidencia.estado.toUpperCase()}</div>
                <div className="campo">DESCRIPCION</div>
                <div className="dato">{incidencia.descripcion}</div>
                <div className="campo">FECHA DE CREACION</div>
                <div className="dato">{formatDate(incidencia.fechaDeCreacion)}</div>
            </div>
            <div className='centrar-boton'>
                <button onClick={onBack} id='boton-volver'> Volver</button>
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
