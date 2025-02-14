const UserInfo = ({ email, phone, address }) => {
    return (
      <div className="user-info mb-4">
        <div className="info-item">
          <h4>Correo electrónico</h4>
          <p>{email || 'No especificado'}</p>
        </div>
        <div className="info-item">
          <h4>Teléfono</h4>
          <p>{phone || 'No especificado'}</p>
        </div>
        <div className="info-item">
          <h4>Dirección</h4>
          <p>{address || 'No especificada'}</p>
        </div>
      </div>
    );
  };
  
  export default UserInfo;