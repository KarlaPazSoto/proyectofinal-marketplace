import React, { useContext, useEffect, useState } from 'react';
import { authService, discountService } from '../../services/api';
import ProfileActions from './ProfileActions';
import UserInfo from './UserInfo';
import ProfileImage from './ProfileImage';
import { UserContext } from '../../contexts/UserContext';

const Profile = () => {
  const { profile, setProfile } = useContext(UserContext);
  const [discountCode, setDiscountCode] = useState('');
  const [discountValue, setDiscountValue] = useState('');
  const [discountType, setDiscountType] = useState('%');
  const [message, setMessage] = useState('');
console.log('Valores del contexto:', { profile, setProfile, discountCode, discountValue, discountType, message });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
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
  }, []);

  const handleSaveDiscountCode = async (e) => {
    e.preventDefault();
    try {
      const discountData = {
        userId: profile.id_usuario,
        codigo: discountCode,
        descuento: discountValue,
        tipo_descuento: discountType,
      };
      await discountService.saveDiscountCode(discountData);
      setMessage('Código de descuento guardado exitosamente');
      
    } catch (error) {
      console.error('Error al guardar el código de descuento:', error);
      setMessage('Error al guardar el código de descuento');
    }
  };

  if (!profile) {
    return (
      <div>
        <p>Cargando perfil...</p>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
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
      <div className="mt-5">
        <h2 className="text-center mb-4">Guardar Código de Descuento</h2>
        <form onSubmit={handleSaveDiscountCode} className="d-flex flex-column align-items-center">
          <div className="mb-3 w-50">
            <label htmlFor="discountCode" className="form-label">Código de Descuento</label>
            <input
              type="text"
              className="form-control"
              id="discountCode"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 w-50">
            <label htmlFor="discountValue" className="form-label">Valor del Descuento</label>
            <input
              type="number"
              className="form-control"
              id="discountValue"
              value={discountValue}
              onChange={(e) => setDiscountValue(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 w-50">
            <label htmlFor="discountType" className="form-label">Tipo de Descuento</label>
            <select
              className="form-select"
              id="discountType"
              value={discountType}
              onChange={(e) => setDiscountType(e.target.value)}
              required
            >
              <option value="%">%</option>
              <option value="CLP">CLP</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Guardar Código</button>
        </form>
        {message && <p className="text-center mt-3">{message}</p>}
      </div>
    </div>
  );
};

export default Profile;