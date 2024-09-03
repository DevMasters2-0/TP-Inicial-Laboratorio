import React, { useState, useEffect } from 'react';
import './App.css';
import WebcamCapture from './components/CamaraWeb/WebcamCapture';

// Componente principal
function App() {
  const [userLocation, setUserLocation] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    dni: '',
    email: '',
    localidad: '',
    tema: '',
    nivelDeRiesgo: '',
    descripcion: '',
    ubicacion: { latitud: 0, longitud: 0 },
  });

  // Opciones de selección
  const [localidades, setLocalidades] = useState([]);
  const [temas, setTemas] = useState([]);
  const [riesgos, setRiesgos] = useState([]);

  // Obtener ubicación del usuario
  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve({ latitud: latitude, longitud: longitude });
          },
          (error) => {
            console.error('Error getting user location:', error);
            reject(null);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
        reject(null);
      }
    });
  };

  // Funciones para obtener opciones
  const getLocalidades = async () => {
    try {
      const response = await fetch(`http://${import.meta.env.VITE_IP}/incidencias/localidades`);
      if (!response.ok) throw new Error('Error fetching localidades');
      const data = await response.json();
      setLocalidades(data.localidades);
    } catch (error) {
      console.error('Error fetching localidades:', error);
    }
  };

  const getTemas = async () => {
    try {
      const response = await fetch(`http://${import.meta.env.VITE_IP}/incidencias/temas`);
      if (!response.ok) throw new Error('Error fetching temas');
      const data = await response.json();
      setTemas(data.temas);
    } catch (error) {
      console.error('Error fetching temas:', error);
    }
  };

  const getRiesgos = async () => {
    try {
      const response = await fetch(`http://${import.meta.env.VITE_IP}/incidencias/riesgos`);
      if (!response.ok) throw new Error('Error fetching riesgos');
      const data = await response.json();
      setRiesgos(data.nivelesDeRiesgo);
    } catch (error) {
      console.error('Error fetching riesgos:', error);
    }
  };

  // useEffect para cargar las opciones
  useEffect(() => {
    getLocalidades();
    getTemas();
    getRiesgos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const locacion = await getUserLocation();
      if (locacion) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          ubicacion: locacion,
        }));
      }
      console.log('Form submitted:', formData);

      const response = await fetch(`http://${import.meta.env.VITE_IP}/incidencias`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Response:', result);

    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const [viewCamara, setViewCamara] = useState(false);

  const handleToggleCamara = () => {
    setViewCamara(!viewCamara);
  };

  return (
    <main className="main">
      <h1>Neighborhood Management System (NMS)</h1>

      <div className="mensaje-container">
        <h2>
          <br />
          ¡Bienvenido a tu Plataforma de Gestión de Incidencias!
          <br />
        </h2>
        <p>
          Estamos encantados de que utilices nuestro sistema para mejorar tu vecindario. Este portal te permite enviar solicitudes para reportar nuevas incidencias en la vía pública de manera rápida y sencilla.
          <br />
          <br />
          ¿Qué puedes hacer aquí?
          <br />
          <br />
          Reportar problemas: Si ves algún inconveniente en las calles, parques o espacios públicos, puedes informarlo aquí.
          Hacer solicitudes: Solicita atención para incidencias que necesitan ser revisadas o solucionadas.
          Para comenzar, completa el formulario con la información relevante. ¡Tu participación es clave para mantener nuestra comunidad en óptimas condiciones!
        </p>
      </div>

      {viewCamara ? (
        <div className='camara-container'>
          <WebcamCapture />
          <button className="toggle-camara-btn abierta" onClick={handleToggleCamara}>
            Cerrar Camara
          </button>
        </div>
      ) : (
        <button className="toggle-camara-btn" onClick={handleToggleCamara}>
          Sacar una Foto
        </button>
      )}

      <div className='form-container'>
        <form onSubmit={handleSubmit} className='form'>
          <div className='form-group'>
            <label htmlFor='nombre'>Nombre</label>
            <input
              type='text'
              id='nombre'
              name='nombre'
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='dni'>DNI</label>
            <input
              type='text'
              id='dni'
              name='dni'
              value={formData.dni}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='localidad'>Localidad</label>
            <select
              id='localidad'
              name='localidad'
              value={formData.localidad}
              onChange={handleChange}
              required
            >
              {localidades.length > 0 && localidades.map((option, index)  => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='tema'>Tema</label>
            <select
              id='tema'
              name='tema'
              value={formData.tema}
              onChange={handleChange}
              required
            >
              {temas.length > 0 && temas.map((option, index)  => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='nivelDeRiesgo'>Riesgo</label>
            <select
              id='nivelDeRiesgo'
              name='nivelDeRiesgo'
              value={formData.nivelDeRiesgo}
              onChange={handleChange}
              required
            >
              {riesgos.length > 0 && riesgos.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='descripcion'>Descripcion</label>
            <textarea
              id='descripcion'
              name='descripcion'
              value={formData.descripcion}
              onChange={handleChange}
              placeholder='Enter descripcion'
              required
            />
          </div>
          <button type='submit' className='submit-button'>Submit</button>
        </form>
      </div>
    </main>
  );
}

export default App;
