import React from "react";

const ProfileSwitch = () => {
  return (
    <div className="d-flex flex-column align-items-center">
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
        />

      </div>
      <div>
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
            Perfil comprador
          </label>
        </div>
    </div>
  );
};

export default ProfileSwitch;
