import React from 'react';
import { Link } from 'react-router-dom';
import { FaLaptop, FaGamepad, FaMobileAlt, FaHeadphones, FaCamera, FaTabletAlt } from 'react-icons/fa';
import '../styles/Categorys.css';

const Categorys = () => {
  const categories = [
    { name: 'Electrónica', icon: <FaLaptop size={24} />, path: '/category/computers' },
    { name: 'Ropa', icon: <FaGamepad size={24} />, path: '/category/gaming' },
    { name: 'Hogar', icon: <FaMobileAlt size={24} />, path: '/category/phones' },
    { name: 'Deportes', icon: <FaHeadphones size={24} />, path: '/category/audio' },
    { name: 'Jueguetes', icon: <FaCamera size={24} />, path: '/category/cameras' },
    { name: 'Otros', icon: <FaTabletAlt size={24} />, path: '/category/tablets' },
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
