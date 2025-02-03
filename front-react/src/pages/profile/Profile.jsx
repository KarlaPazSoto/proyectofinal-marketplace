import React from 'react'
import { Link } from 'react-router-dom'

const Profile = () => {
  return (
    <div className='container col-4'>
      <div>
        <h2>Mi perfil</h2>
        <h4>Nombre</h4>
        <p>correo</p>
        <p>direccion</p>
        <p>telefono</p>
      </div>
      <div className='d-flex flex-column'>
          <Link to='/feed'>
          <button className="btn btn-primary" type="button">
            Mis publicaciones
          </button>
          </Link>
          <Link>
          <button className='btn btn-primary' type='button'>Editar perfil</button>
          </Link>
          <Link to='/principal'>
          <button className="btn btn-primary" type="button">
            Cerrar sesión
          </button>
          </Link>
      </div>
    </div>
  )
}

export default Profile