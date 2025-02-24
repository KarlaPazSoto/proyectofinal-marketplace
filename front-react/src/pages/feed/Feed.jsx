import React, { useState, useEffect } from 'react';
import { productService } from '../../services/api';
import ProductGrid from './ProductGrid';
import EditProduct from './EditProduct';
import AddProduct from './AddProduct';
import { Button } from 'react-bootstrap';

const Feed = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getAllProducts();
      // Asegurarse de que data sea un array
      setProductos(Array.isArray(data) ? data : []);
      console.log('Productos cargados:', data); // Para debugging
    } catch (error) {
      console.error('Error al cargar productos:', error);
      setError('Error al cargar los productos. Por favor, intente más tarde.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      try {
        await productService.deleteProduct(productId);
        setProductos(productos.filter(p => p.id !== productId));
      } catch (error) {
        console.error('Error al eliminar:', error);
        setError('Error al eliminar el producto');
      }
    }
  };

  const handleEdit = (productId) => {
    const productoAEditar = productos.find(p => p.id === productId);
    setEditingProduct(productoAEditar);
  };

  const handleUpdateProduct = async (productId, updatedData) => {
    try {
      const updatedProduct = await productService.updateProduct(productId, updatedData);
      setProductos(productos.map(p => 
        p.id === productId ? updatedProduct : p
      ));
      setEditingProduct(null);
    } catch (error) {
      console.error('Error al actualizar:', error);
      setError('Error al actualizar el producto');
    }
  };

  const handleAddProduct = async (newProductData) => {
    try {
      const createdProduct = await productService.createProduct(newProductData);
      setProductos([...productos, createdProduct]);
      setIsAddingProduct(false);
    } catch (error) {
      console.error('Error al crear el producto:', error);
      setError('Error al crear el producto');
    }
  };

  if (loading) {
    return (
      <div className="text-center p-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Mis Productos</h2>
        <Button 
          variant="primary" 
          onClick={() => setIsAddingProduct(true)}
        >
          Agregar Producto
        </Button>
      </div>

      {isAddingProduct ? (
        <AddProduct
          handleAddProduct={handleAddProduct}
          onCancel={() => setIsAddingProduct(false)}
        />
      ) : editingProduct ? (
        <EditProduct
          producto={editingProduct}
          handleUpdateProduct={handleUpdateProduct}
          onCancel={() => setEditingProduct(null)}
        />
      ) : (
        <ProductGrid 
          productos={productos}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      )}
    </div>
  );
};

export default Feed;