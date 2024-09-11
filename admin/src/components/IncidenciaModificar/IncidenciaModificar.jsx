import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import iconoTilde from './correct-success-tick-svgrepo-com.svg';

const IncidenciaModificar = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [incidencia, setIncidencia] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [temas, setTemas] = useState([]);
    const [estados, setEstados] = useState([]);
    const [temaSeleccionado, setTemaSeleccionado] = useState('');
    const [estadoSeleccionado, setEstadoSeleccionado] = useState('');
    const [confirmado, setConfirmado] = useState(false);

    useEffect(() => {
        const fetchIncidencia = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/incidencias/${id}`);
                setIncidencia(response.data.Incidencia);
                setTemaSeleccionado(response.data.Incidencia.tema); // Establece el tema seleccionado inicial
                setEstadoSeleccionado(response.data.Incidencia.estado);  // Establece el estado seleccionado inicial
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchIncidencia();
        }
        getTemas();
        getEstados();
    }, [id]);

    
        const getTemas = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/incidencias/temas`);
                if (!response.ok) throw new Error('Error fetching temas');
                const data = await response.json();
                setTemas(data.temas);
            } catch (error) {
                console.error('Error fetching temas:', error);
            }
        };

        const getEstados = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/incidencias/estados`);
                if (!response.ok) throw new Error('Error fetching estados');
                const data = await response.json();
                setEstados(data.estados);
            } catch (error) {
                console.error('Error fetching estados:', error);
            }
        };
        
    const onBack = () => {
        navigate(`/admin/incidencias/${incidencia.incidencia_id}`);
    };

    const handleTema = (event) => {
        setTemaSeleccionado(event.target.value);
    };
   
    const handleEstado = (event) => {
        setEstadoSeleccionado(event.target.value);
    };

    const handleConfirmarCambio = async () => {
        const dataUpdate = {
            tema: temaSeleccionado,
            estado: estadoSeleccionado
        };

        console.log(dataUpdate);
        if(temaSeleccionado===incidencia.tema && estadoSeleccionado === incidencia.estado){
            console.log("No hay cambios por realizar")
        }else{
            try {
                await axios.put(`${import.meta.env.VITE_API_URL}/incidencias/${id}`, dataUpdate);
                console.log("cambio confirmado");
                setConfirmado(true);
                iniciarTiempo();
            } catch (error) {
                console.log(error);
            }
        }
    };
    const iniciarTiempo= () =>  {
        // Redirigir después de 3 segundos
        setTimeout(() => {
            navigate(`/admin/incidencias/${incidencia.incidencia_id}`); // Redirige a la página del detalle de la incidencia
        }, 5000); 
    }

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
        <>
        {!confirmado? (
            <div className="incidencias-container-modal">
        
                <div className="incidencia-modal">
                    <div className="detalle">
                        <div className="campo-container inhabilitadoFuente">
                            <div className="campo">ID</div>
                            <div className="dato">{incidencia.incidencia_id}</div>
                        </div>
                        <div className="campo-container inhabilitadoFuente">
                            <div className="campo">NOMBRE</div>
                            <div className="dato">{incidencia.nombre}</div>
                        </div>
                        <div className="campo-container inhabilitadoFuente">
                            <div className="campo">DNI</div>
                            <div className="dato">{incidencia.dni}</div>
                        </div>
                        <div className="campo-container inhabilitadoFuente">
                            <div className="campo">EMAIL</div>
                            <div className="dato">{incidencia.email}</div>
                        </div>
                        <div className="campo-container ">
                            <div className="campo">TEMA</div>
                            <div className="dato" style={{fontWeight: 'bold'}}>
                                <select value={temaSeleccionado} onChange={handleTema} style={{backgroundColor: 'white',fontWeight:'bold', cursor: 'pointer', border: 'solid 1px black', padding:'4px', borderRadius: '0.2rem'}}>
                                    {temas.map((tema, index) => (
                                        <option key={index} value={tema} style={{fontWeight:'bold', textAlign:'center'}}>
                                            {tema}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="campo-container inhabilitadoFuente">
                            <div className="campo">RIESGO</div>
                            <div className="dato">{capitalize(incidencia.nivelDeRiesgo)}</div>
                        </div>
                        <div className="campo-container inhabilitadoFuente">
                            <div className="campo">LOCALIDAD</div>
                            <div className="dato">{capitalize(incidencia.localidad)}</div>
                        </div>
                        <div className="campo-container">
                            <div className="campo">ESTADO</div>
                            <div className="dato">
                                <select value={estadoSeleccionado} onChange={handleEstado} style={{backgroundColor: 'white',fontWeight:'bold', cursor: 'pointer', border: 'solid 1px black', padding:'4px', borderRadius: '0.2rem'}}>
                                    {estados.map((estado, index) => (
                                        <option key={index} value={estado} style={{fontWeight:'bold'}}>
                                            {estado}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="campo-container inhabilitadoFuente">
                            <div className="campo">DESCRIPCION</div>
                            <div className="dato" style={{ maxWidth: '200px' }}>{incidencia.descripcion}</div>
                        </div>
                        <div className="campo-container inhabilitadoFuente">
                            <div className="campo">FECHA DE CREACION</div>
                            <div className="dato">{formatDate(incidencia.fechaDeCreacion)}</div>
                        </div>
                    </div>
                </div>
                <div className='contenedor-botones'>
                    <button onClick={onBack} id='boton-volver'>Volver</button>
                    <button onClick={handleConfirmarCambio} id='boton-confirmar'>Confirmar Cambios</button>
                    
                </div>
            </div>
            ):(
            <div className="centrar-contenido"> 
                <img style={{ display: 'block', marginBottom: '10px', alignItems:'center' }} src={iconoTilde} alt="Icono de tilde" width="50px" />
                <p style={{color: 'black', fontSize:' 1.6rem', display: 'block'}}>Cambio confirmado con exito </p>
                <p style={{color: 'black', fontSize:' 0.8rem', display: 'block'}}>(Usted será redirijido en 5 segundos)</p>
                
            </div> 
            
            
            )};
            </>
            );
        };

export default IncidenciaModificar;