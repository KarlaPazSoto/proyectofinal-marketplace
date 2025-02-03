import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='container col-4'>
      <h2>Iniciar sesión</h2>
      <form>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Correo electrónico</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Contraseña</label>
    <input type="password" className="form-control" id="exampleInputPassword1"/>
  </div>
  {/* <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" for="exampleCheck1">Check me out</label>
  </div> */}
    <div className='d-flex flex-column text-center'>
          <Link to='/'>
          <button className="btn btn-primary" type="submit">
            Iniciar sesión
          </button>
          </Link>
    <p>¿No tienes cuenta? <Link to='/register'>Regístrate</Link></p>
    </div>
</form>
    </div>
  )
}

export default Login