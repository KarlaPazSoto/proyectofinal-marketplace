import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const UserInfo = () => {
  const { profile } = useContext(UserContext);

  return (
    <div className="text-center">
      <h3>{profile.nombre}</h3>
      <p>{profile.email}</p>
      <p>{profile.telefono}</p>
      <p>{profile.direccion}</p>
      <p>{profile.tipo_usuario}</p>
    </div>
  );
};

export default UserInfo;
