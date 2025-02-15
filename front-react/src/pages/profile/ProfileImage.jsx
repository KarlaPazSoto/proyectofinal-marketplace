import React from 'react'
import data from '../../data/db.json'
import '../../styles/Profile.css'


const ProfileImage = () => {
  const users = data.users[0]
  return (
    <div className="container mb-3">
    <img src={users.img} alt={users.name} className='img-perfil' />
</div>
  )
}

export default ProfileImage