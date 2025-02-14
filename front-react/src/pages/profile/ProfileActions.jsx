import { Link } from 'react-router-dom';

const ProfileActions = () => {
  return (
    <div className="profile-actions d-flex flex-column gap-2">
      <Link to="/feed">
        <button className="btn btn-primary w-100">
          Mis publicaciones
        </button>
      </Link>
      <Link to="/edit-profile">
        <button className="btn btn-primary w-100">
          Editar perfil
        </button>
      </Link>
      <Link to="/principal">
        <button className="btn btn-primary w-100">
          Cerrar sesión
        </button>
      </Link>
    </div>
  );
};

export default ProfileActions;