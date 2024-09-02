import React from 'react'
import './IncidenciaDetalle.css';



const IncidenciaDetalle = ({incidencia, onBack}) => {
    
    return (
     <div className="incidencias-container">
        <div className="incidencia">
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
            <div className="dato"> {formatDate(incidencia.fechaDeCreacion)}</div>
        </div>
        <div className='centrar-boton'><button onClick={onBack} id='boton-volver'> Volver</button></div>
    </div>
    
    
    )
}

const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

const capitalize= (pal) =>{
    if(pal == null ){
        return pal;
    }
    return pal.substring(0,1).toUpperCase()+pal.substring(1).toLowerCase();
}

export default IncidenciaDetalle