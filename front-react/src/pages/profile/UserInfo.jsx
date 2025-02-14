import React from "react";
import data from "../../data/db.json";

const UserInfo = () => {
  const users = data.users[0];
  return (
    <div className="text-center">
      <h3>{users.name}</h3>
      <p>{users.email}</p>
      <p>{users.phone}</p>
      <p>{users.adress}</p>
    </div>
  );
};

export default UserInfo;
