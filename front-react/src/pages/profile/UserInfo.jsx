import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const UserInfo = () => {
  const { profile } = useContext(UserContext);

  return (
    <div className="text-center">
      <h3>{profile.name}</h3>
      <p>{profile.email}</p>
      <p>{profile.phone}</p>
      <p>{profile.adress}</p>
    </div>
  );
};

export default UserInfo;
