import { Link } from 'react-router-dom';
import '../../styles/Profile.css'

const ProfileActions = () => {
  return (
    <div className="d-flex flex-column gap-2 align-items-center">
          <Link to='/edit-profile'>
          <button className='btn-actions'>Editar perfil</button>
          </Link>

          <Link to='/feed'>
          <button className='btn-actions'>Mis publicaiones</button>
          </Link>

          <Link to='/purchases'>
          <button className='btn-actions'>Mis compras</button>
          </Link>

          <Link to='/principal'>
          <button className='btn-actions'>Cerrar sesión</button>
          </Link>
    </div>
  );
};

export default ProfileActions;