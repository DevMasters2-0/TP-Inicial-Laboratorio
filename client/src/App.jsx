import React, { useState } from 'react';
import './App.css';
import WebcamCapture from './components/CamaraWeb/WebcamCapture';

function App() {
  const [userLocation, setUserLocation] = useState(null);

  const getUserLocation = () => {
    // if geolocation is supported by the users browser
    if (navigator.geolocation) {
      // get the current users location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // save the geolocation coordinates in two variables
          const { latitude, longitude } = position.coords;
          // update the value of userlocation variable
          setUserLocation({ latitude, longitude });
        },
        // if there was an error getting the users location
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    }
    // if geolocation is not supported by the users browser
    else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const [formData, setFormData] = useState({
    name: '',
    dni: '',
    email: '',
    localidad: '',
    tema: '',
    riesgo: '',
    descripcion: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  const [viewCamara, setViewCamara] = useState(false);

  const handleToggleCamara = () => {
    setViewCamara(!viewCamara);
  }

  // return an HTML page for the user to check their location
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


      {/**
       <button onClick={getUserLocation}>Get Location</button>
      
       {userLocation && (
         <div>
           <h2>User Location</h2>
           <p>Latitude: {userLocation.latitude}</p>
           <p>Longitude: {userLocation.longitude}</p>
         </div>
       )}
       */}

      {/** Capturar la Imagen */}
      {viewCamara ?
        <div className='camara-container'
        >
          <WebcamCapture />
          <button className="toggle-camara-btn abierta" onClick={handleToggleCamara}>
            Cerrar Camara
          </button>
        </div> :
        <button className="toggle-camara-btn" onClick={handleToggleCamara}>
          Sacar una Foto
        </button>
      }

      {/** Formulario */}
      <div className='form-container'>
        <form onSubmit={handleSubmit} className='form'>
          <div className='form-group'>
            <label htmlFor='name'>Nombre</label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
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
              value={formData.neighborhoodName}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='neighborhoodName'>Email</label>
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
            <input
              type='text'
              id='localidad'
              name='localidad'
              value={formData.localidad}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='tema'>Tema</label>
            <input
              type='text'
              id='tema'
              name='tema'
              value={formData.tema}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='tema'>Riesgo</label>
            <input
              type='text'
              id='riesgo'
              name='riesgo'
              value={formData.riesgo}
              onChange={handleChange}
              required
            />
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