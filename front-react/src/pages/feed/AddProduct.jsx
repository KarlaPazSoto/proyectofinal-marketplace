import React, { useState } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';

const AddProduct = ({ handleAddProduct, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    categoria: '',
    imagenes: ''
  });

  const categorias = [
    'Electrónica',
    'Ropa',
    'Hogar',
    'Deportes',
    'Juguetes',
    'Otros'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validar campos requeridos
      if (!formData.nombre || !formData.precio || !formData.stock || !formData.categoria) {
        throw new Error('Por favor complete todos los campos requeridos');
      }

      // Convertir precio y stock a números
      const productoData = {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        precio: parseFloat(formData.precio),
        stock: parseInt(formData.stock),
        categoria: formData.categoria,
        imagenes: formData.imagenes ? formData.imagenes : null
      };

      await handleAddProduct(productoData);
      onCancel();
    } catch (error) {
      setError(error.message || 'Error al crear el producto');
      console.error('Error al crear producto:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-sm">
      <Card.Header className="bg-primary text-white">
        <h3 className="mb-0">Agregar Nuevo Producto</h3>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre del Producto</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  name="precio"
                  value={formData.precio}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows={3}
              required
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Categoría</Form.Label>
                <Form.Select
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccionar categoría</option>
                  {categorias.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-4">
            <Form.Label>URL de la Imagen</Form.Label>
            <Form.Control
              type="url"
              name="imagenes"
              value={formData.imagenes}
              onChange={handleChange}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </Form.Group>

          <div className="d-flex gap-2 justify-content-end">
            <Button 
              variant="outline-secondary" 
              onClick={onCancel}
            >
              Cancelar
            </Button>
            <Button 
              variant="primary" 
              type="submit"
            >
              Crear Producto
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddProduct;