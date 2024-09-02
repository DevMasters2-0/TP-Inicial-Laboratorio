import React from 'react'
import './Incidencia.css';


const Incidencia = ({incidencias, onDetalleClick}) => {
   
    return (
        
        <div className="incidencias-container">
              <div className="campos-list">
                <div className="incidencia-nombre">NOMBRE</div>
                <div className="incidencia-localidad">LOCALIDAD</div>
                <div className="incidencia-riesgo">RIESGO</div>
                <div className="incidencia-estado">ESTADO</div>
                <div className="incidencia-detalle"> INGRESAR AL DETALLE </div>
               
              </div>
        

        {incidencias.map((incidencia)=>
            <div className="incidencias-list" key={incidencia.incidencia_id}>
                <div className='incidencia'>
                    <div className="incidencia-nombre">
                        {incidencia.nombre}
                    </div>
                    <div className="incidencia-localidad">
                        {incidencia.localidad}
                    </div>
                    <div className="incidencia-riesgo">{incidencia.nivelDeRiesgo.toUpperCase()}</div>
                    <div className="incidencia-estado">{incidencia.estado}</div>
                    <div className='incidencia-detalle'><button onClick={() => onDetalleClick(incidencia)}>Detalle</button></div>
                </div>
            </div>
            )}
        </div>
    );
    }
export default Incidencia
