const ProfileImage = ({ src = '/default-avatar.png', alt }) => {
    return (
      <div className="profile-image-container mb-3">
        <img 
          src={src} 
          alt={alt || 'Foto de perfil'} 
          className="rounded-circle"
          style={{ width: '150px', height: '150px', objectFit: 'cover' }}
        />
      </div>
    );
  };
  
  export default ProfileImage;