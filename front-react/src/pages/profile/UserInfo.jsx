import React from 'react'
import data from '../../data/db.json'
  
  const UserInfo = () => {
    return (
      <div>
              <div className="user-info mb-4">
        <div className="info-item">
          <h4>Correo electrónico</h4>
          <p>{data.users.email}</p>
        </div>
        <div className="info-item">
          <h4>Teléfono</h4>
          <p>{data.users.phone}</p>
        </div>
        <div className="info-item">
          <h4>Dirección</h4>
          <p>{data.users.adress}</p>
        </div>
      </div>
      </div>
    )
  }
  
  export default UserInfo