import React from 'react'

const Incidencia = ({props}) => {
    return (
        <div className="incidencia">
            <div className="incidencia-nombre">
                {props.nombre}
            </div>
            <div className="incidencia-localidad">
                {props.localidad}
            </div>
            <div className="incidencia-riesgo">{props.nivelDeRiesgo.toUpperCase()}</div>
            <div className="incidencia-estado">{props.estado}</div>
            <div className="incidencia-detalle">
                <div className="boton-detalle">+</div>
            </div>
        </div>
    )
}

export default Incidencia
