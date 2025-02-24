import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

const ProductGrid = ({ productos, handleDelete, handleEdit }) => {
  // Verificar si productos es undefined o null
  if (!productos || productos.length === 0) {
    return <div className="text-center">No hay productos disponibles</div>;
  }

  return (
    <div className="container py-4">
      <Row xs={1} md={2} lg={3} className="g-4">
        {Array.isArray(productos) && productos.map((producto) => (
          <Col key={producto.id}>
            <Card className="h-100 shadow-sm">
              <div className="position-relative">
                {producto.imagen && (
                  <Card.Img
                    variant="top"
                    src={producto.imagen}
                    alt={producto.nombre}
                    style={{ 
                      height: '200px', 
                      objectFit: 'cover' 
                    }}
                  />
                )}
                <div className="position-absolute top-0 end-0 m-2">
                  <span className="badge bg-primary">
                    Stock: {producto.stock}
                  </span>
                </div>
              </div>
              
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fw-bold">{producto.nombre}</Card.Title>
                <Card.Text className="text-muted mb-2">
                  {producto.descripcion}
                </Card.Text>
                <Card.Text className="fs-5 fw-bold text-primary mb-3">
                  ${producto.precio}
                </Card.Text>
                
                <div className="mt-auto d-flex gap-2">
                  <Button 
                    variant="outline-primary" 
                    className="flex-grow-1"
                    onClick={() => handleEdit(producto.id)}
                  >
                    Editar
                  </Button>
                  <Button 
                    variant="outline-danger" 
                    className="flex-grow-1"
                    onClick={() => handleDelete(producto.id)}
                  >
                    Eliminar
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductGrid;