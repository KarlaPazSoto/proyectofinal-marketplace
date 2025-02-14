import { Link } from 'react-router-dom';

const ProfileActions = () => {
  return (
    <div className="d-flex flex-column gap-2 align-items-center">
          <Link to='/edit-profile'>
          <button className='btn btn-dark'>Editar perfil</button>
          </Link>

          <Link to='/feed'>
          <button className='btn btn-dark'>Mis publicaiones</button>
          </Link>

          <Link to='/principal'>
          <button className='btn btn-dark'>Cerrar sesión</button>
          </Link>
    </div>
  );
};

export default ProfileActions;