import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
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
import ProtectedRoute from './ProtectedRoute';
import Cart from '../components/Cart';
import Carousel from '../components/Carousel';
import Search from "../pages/search/Search";
import Categorys from '../components/Categorys';
import UserInfo from '../pages/profile/UserInfo';
import PurchaseSummary from '../components/PurchaseSummary';
import EditProfile from '../pages/profile/EditProfile';
import SearchPage from '../pages/search/SearchPage';

function AppRoutes() {
  const { token } = useContext(UserContext);

  return (
    <Routes>
      {/* Si NO está autenticado, solo puede ver /principal */}
      {!token ? (
        <>
          <Route path="/principal" element={<Principal />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Si intenta acceder a cualquier otra ruta, lo redirige a /principal */}
          <Route path="*" element={<Navigate to="/principal" />} />
        </>
      ) : (
        <>
          {/* Si está autenticado, puede ver todas las rutas protegidas */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/carousel" element={<Carousel />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/card" element={<Card />} />
          <Route path="/pagination" element={<Pagination />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/post-details" element={<PostDetails />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/categorys" element={<Categorys />} />
          <Route path="/user-info" element={<UserInfo />} />
          <Route path="/purchase-summary" element={<PurchaseSummary />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          {/* Cualquier otra ruta desconocida lo manda al Home */}
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
}

export default AppRoutes;
