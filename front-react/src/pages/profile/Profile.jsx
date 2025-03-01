import React, { useContext, useEffect } from 'react';
import { authService } from '../../services/api';
import ProfileActions from './ProfileActions';
import UserInfo from './UserInfo';
import ProfileImage from './ProfileImage';
/* import ProfileSwitch from './ProfileSwitch'; */
import { UserContext } from '../../contexts/UserContext';

const Profile = () => {
  const { profile, setProfile } = useContext(UserContext);
  console.log('Valores del contexto:', { profile, setProfile });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log('Iniciando fetch del perfil');
        const data = await authService.getProfile();
        console.log('Datos recibidos:', data);
        setProfile(data);
      } catch (error) {
        console.error('Error al cargar el perfil:', error);
        console.error('Detalles del error:', {
          mensaje: error.message,
          respuesta: error.response?.data,
          estado: error.response?.status
        });
      }
    };

    fetchProfile();
  }, [setProfile]);

  if (!profile) {
    return <div>
      <p>Cargando perfil...</p>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>;
  }

  return (
    <div className='mt-5 mb-5 px-3'>
      <h1 className='text-center mb-5'>Mi perfil</h1>
      <div className="profile-container d-flex justify-content-evenly align-items-center">
        <div className='mt-3'>
          <ProfileImage />
        </div>
        <div className='user-info-container'>
          <UserInfo />
        </div>
        <div className='actions-container'>
          <ProfileActions />
        </div>
      </div>
      {/* <ProfileSwitch /> */}
    </div>
  );
};

export default Profile;