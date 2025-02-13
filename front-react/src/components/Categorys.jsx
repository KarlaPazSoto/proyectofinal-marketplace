import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { FaLaptop, FaGamepad, FaMobileAlt, FaHeadphones, FaCamera, FaTabletAlt } from 'react-icons/fa';

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
    <Container fluid className="border-bottom py-3">
      <Row className="justify-content-center">
        {categories.map((category, index) => (
          <Col key={index} xs={4} sm={4} md={2} className="text-center mb-3">
            <Link to={category.path} className="text-decoration-none text-dark">
              <div className="d-flex flex-column align-items-center">
                {category.icon}
                <span className="mt-2">{category.name}</span>
              </div>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Categorys;
