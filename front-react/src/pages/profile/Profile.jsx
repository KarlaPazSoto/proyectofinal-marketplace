import React, { useContext, useEffect } from 'react';
import { authService } from '../../services/api';
import ProfileActions from './ProfileActions';
import UserInfo from './UserInfo';
import ProfileImage from './ProfileImage';
import ProfileSwitch from './ProfileSwitch';
import { UserContext } from '../../contexts/UserContext';

const Profile = () => {
  const { profile, setProfile } = useContext(UserContext);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await authService.getProfile();
        setProfile(data);
      } catch (error) {
        console.error('Error al cargar el perfil:', error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return <p>Cargando perfil...</p>;
  }

  return (
    <div className='mt-4 mb-4 px-3'>
      <h1 className='text-center'>Mi perfil</h1>
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
      <ProfileSwitch />
    </div>
  );
};

export default Profile;