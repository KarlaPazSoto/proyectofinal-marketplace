import { Form } from 'react-bootstrap';

const ProfileSwitch = ({ isSellerProfile, onChange }) => (
  <div className="position-absolute top-0 end-0 m-4">
    <Form.Check 
      type="switch"
      id="profile-switch"
      label={isSellerProfile ? "Perfil Vendedor" : "Perfil Comprador"}
      checked={isSellerProfile}
      onChange={onChange}
      className="profile-switch"
    />
  </div>
);

export default ProfileSwitch;