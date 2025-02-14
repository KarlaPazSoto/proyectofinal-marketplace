import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/home/Home';
import About from '../pages/about/About';
import Register from '../pages/register/Register';
import Login from '../pages/login/Login';
import Profile from '../pages/profile/Profile';
import Feed from '../pages/feed/Feed';
import CreatePost from '../pages/createPost/CreatePost';
import Gallery from '../pages/gallery/Gallery';
import Card from '../components/Card';
import Pagination from '../components/Pagination';
import PostDetails from '../pages/postDetails/PostDetails';
import Principal from '../pages/principal/Principal';
import Cart from '../components/Cart';
import Carousel from '../components/Carousel';
import Header from '../components/Header';


function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/principal" element={<Principal />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/header" element={<Header />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/carousel" element={<Carousel />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/card" element={<Card />} />
        <Route path="/pagination" element={<Pagination />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/post-details" element={<PostDetails />} />
    </Routes>
  )
}

export default AppRoutes;