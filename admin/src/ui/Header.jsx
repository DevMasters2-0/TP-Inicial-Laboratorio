import React from 'react'

const Header = ({ isAuthenticated }) => {
  console.log("Desde header")
  console.log(isAuthenticated)
  return (
    <header>
      <h1>NMS</h1>
      <div className="nombre">
        <p>
          <strong>{isAuthenticated.nombre} {isAuthenticated.apellido}</strong>
        </p>
      </div>
    </header>
  )
}

export default Header
