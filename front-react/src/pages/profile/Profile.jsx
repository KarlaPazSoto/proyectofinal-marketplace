import React from 'react'
import data from '../../data/db.json'
import { Link } from 'react-router-dom'
import ProfileActions from './ProfileActions'
import UserInfo from './UserInfo'
import ProfileImage from './ProfileImage'
import ProfileSwitch from './ProfileSwitch'

const Profile = () => {

  return (
    <div>
      <h1 className='text-center'>Mi perfil</h1>
      <div className="d-flex justify-content-evenly align-items-center gap-5">
        <div  className='mt-3'>
          <ProfileImage />
        </div>
        <div>
          <UserInfo />
        </div>
        <div>
          <ProfileActions />
        </div>
      </div>
      <ProfileSwitch />
    </div>
  )
}

export default Profile