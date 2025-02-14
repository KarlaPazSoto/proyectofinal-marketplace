import React, { useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import ProfileImage from './/ProfileImage';
import UserInfo from './UserInfo';
import ProfileActions from './ProfileActions';
import ProfileSwitch from './ProfileSwitch';

const Profile = () => {
  const [isSellerProfile, setIsSellerProfile] = useState(false);

  // Aquí podrías agregar un estado o llamada a API para obtener los datos del usuario
  const userData = {
    name: 'Nombre del Usuario',
    email: 'correo@ejemplo.com',
    phone: '+56 9 1234 5678',
    address: 'Dirección del usuario',
    profileImage: '/ruta-a-imagen-perfil.jpg'
  };

  const handleProfileChange = (e) => {
    setIsSellerProfile(e.target.checked);
  };

  return (
    <Container>
      <div className="position-relative">
        <ProfileSwitch 
          isSellerProfile={isSellerProfile}
          onChange={handleProfileChange}
        />
        
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <div className="profile-container text-center p-4">
              <ProfileImage 
                src={userData.profileImage}
                alt={userData.name}
              />
              
              <h2 className="mb-4">{userData.name}</h2>

              <UserInfo 
                email={userData.email}
                phone={userData.phone}
                address={userData.address}
              />

              <ProfileActions />
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Profile;