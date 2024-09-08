import React from 'react'
import { useAuthContext } from '../context/AuthProvider'

const Header = () => {
  const { usuario } = useAuthContext();
  console.log("El usuario es: ", usuario)
  return (
    <header>
      <h1>NMS</h1>
      <div className="perfil">
        <p>
          <strong>{usuario.nombre + " " + usuario.apellido}</strong>
        </p>
       
      </div>
    </header>
  )
}

export default Header
