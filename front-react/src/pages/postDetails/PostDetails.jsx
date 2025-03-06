import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { productService } from '../../services/api';

const PostDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await productService.getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error('Error al obtener el producto:', error);
        setError('No se pudo cargar el producto. Por favor, intente más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="container mt-4">Cargando...</div>;
  if (error) return <div className="container mt-4 alert alert-danger">{error}</div>;
  if (!product) return <div className="container mt-4">Producto no encontrado</div>;

  return (
    <div className="container mt-5 mb-5">
      <div className="card">
        <div className="row g-0">
          <div className="col-md-4">
            {product.imagenes && product.imagenes.length > 0 ? (
              <img 
                src={product.imagenes[0]} 
                className="img-fluid rounded-start" 
                alt={product.nombre_producto} 
              />
            ) : (
              <div className="text-center p-3">No hay imagen disponible</div>
            )}
          </div>
          <div className="col-md-8">
            <div className="card-body text-start ps-5 pe-5">
              <h2 className="card-title">{product.nombre_producto}</h2>
              <p className="card-text">{product.descripcion}</p>
              <p className="card-text"><strong>Precio: </strong>${product.precio}</p>
              <p className="card-text"><strong>Stock: </strong>{product.stock}</p>
              <p className="card-text"><small className="text-muted">Categoría: {product.categoria}</small></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;