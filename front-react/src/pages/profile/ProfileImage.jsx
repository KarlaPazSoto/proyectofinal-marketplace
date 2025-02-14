import React from 'react'
import data from '../../data/db.json'


const ProfileImage = () => {
  const users = data.users[0]
  return (
    <div className="container mb-3">
    <img src={users.img} alt={users.name} />
</div>
  )
}

export default ProfileImage