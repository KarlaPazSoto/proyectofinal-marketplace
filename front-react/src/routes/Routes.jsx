import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/home/Home';
import About from '../pages/about/About';
import Register from '../pages/register/Register';
import Login from '../pages/login/Login';
import Profile from '../pages/profile/Profile';
import CreatePost from '../pages/createPost/CreatePost';
import Gallery from '../pages/gallery/Gallery';
import PostDetails from '../pages/postDetails/PostDetails';
import Principal from '../pages/principal/Principal';

function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/principal" element={<Principal />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/post-details" element={<PostDetails />} />
    </Routes>
  )
}

export default AppRoutes;