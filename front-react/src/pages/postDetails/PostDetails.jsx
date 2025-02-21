import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PostDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/productos/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error al obtener el producto:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Cargando...</div>;

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="row g-0">
          <div className="col-md-4">
            <img src={product.imagenes} className="img-fluid rounded-start" alt={product.nombre_producto} />
          </div>
          <div className="col-md-8">
            <div className="card-body">
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