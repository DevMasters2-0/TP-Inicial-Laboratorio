import React from 'react'
import './IncidenciaDetalle.css';



const IncidenciaDetalle = ({incidencia, onBack}) => {
    
    return (
     <div class="incidencias-container">
        <div class="incidencia">
            <div class="campo">ID</div>
            <div class="dato">{incidencia.id}</div>
            <div class="campo">NOMBRE</div>
            <div class="dato">{incidencia.nombre}</div>
            <div class="campo">DNI</div>
            <div class="dato">{incidencia.dni}</div>
            <div class="campo">EMAIL</div>
            <div class="dato">{incidencia.email}</div>
            <div class="campo">TEMA</div>
            <div class="dato">{capitalize(incidencia.tema)}</div>
            <div class="campo">RIESGO</div>
            <div class="dato">{capitalize(incidencia.nivelDeRiesgo)}</div>
            <div class="campo">LOCALIDAD</div>
            <div class="dato">{capitalize(incidencia.localidad)}</div>
            <div class="campo">ESTADO</div>
            <div class="dato">{incidencia.estado.toUpperCase()}</div>
            <div class="campo">DESCRIPCION</div>
            <div class="dato">{incidencia.descripcion}</div>
            <div class="campo">FECHA DE CREACION</div>
            <div class="dato"> {formatDate(incidencia.fechaDeCreacion)}</div>
        </div>
        <div class='centrar-boton'><button onClick={onBack} id='boton-volver'> Volver</button></div>
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