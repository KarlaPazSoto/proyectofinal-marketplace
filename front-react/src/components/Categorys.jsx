import React from 'react';
import { Link } from 'react-router-dom';
import { FaLaptop, FaGamepad, FaMobileAlt, FaHeadphones, FaCamera, FaTabletAlt } from 'react-icons/fa';
import '../styles/Categorys.css';

const Categorys = () => {
  const categories = [
    { name: 'Computadoras', icon: <FaLaptop size={24} />, path: '/category/computers' },
    { name: 'Gaming', icon: <FaGamepad size={24} />, path: '/category/gaming' },
    { name: 'Celulares', icon: <FaMobileAlt size={24} />, path: '/category/phones' },
    { name: 'Audio', icon: <FaHeadphones size={24} />, path: '/category/audio' },
    { name: 'Cámaras', icon: <FaCamera size={24} />, path: '/category/cameras' },
    { name: 'Tablets', icon: <FaTabletAlt size={24} />, path: '/category/tablets' },
  ];

  return (
    <nav className="categories-nav">
      <ul className="categories-list">
        {categories.map((category, index) => (
          <li key={index} className="category-item">
            <Link to={category.path} className="category-link">
              <div className="category-content">
                {category.icon}
                <span>{category.name}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Categorys;
