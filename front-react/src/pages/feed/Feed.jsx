import React, { useState, useEffect } from 'react';
import { productService } from '../../services/api';
import ProductGrid from './ProductGrid';
import EditProduct from './EditProduct';
import AddProduct from './AddProduct';
import { Button } from 'react-bootstrap';

const Feed = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  const fetchProducts = async () => {
    try {
      const data = await productService.getAllProducts();
      setProductos(data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      try {
        await productService.deleteProduct(productId);
        setProductos(productos.filter(p => p._id !== productId));
      } catch (error) {
        console.error('Error al eliminar:', error);
      }
    }
  };

  const handleEdit = (productId) => {
    const productoAEditar = productos.find(p => p._id === productId);
    setEditingProduct(productoAEditar);
  };

  const handleUpdateProduct = async (productId, updatedData) => {
    try {
      const updatedProduct = await productService.updateProduct(productId, updatedData);
      setProductos(productos.map(p => 
        p._id === productId ? updatedProduct : p
      ));
      setEditingProduct(null);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAddProduct = async (newProductData) => {
    try {
      const createdProduct = await productService.createProduct(newProductData);
      setProductos([...productos, createdProduct]);
      setIsAddingProduct(false);
    } catch (error) {
      console.error('Error al crear el producto:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center p-5">Cargando productos...</div>;
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Productos</h2>
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