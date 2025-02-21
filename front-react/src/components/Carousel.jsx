import React from "react";
import useProducts from "../hooks/useProducts";
import "../styles/Carousel.css";

const Carousel = () => {
  const { products, loading, error } = useProducts();

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>Error al cargar productos: {error.message}</div>;

  console.log("Productos:", products);

  return (
    <div>
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="2000"
      >
        <div className="carousel-inner carousel-image">
          {products.map((product, index) => (
            product.imagenes.map((imagen, imgIndex) => (
              <div key={`${product.id_producto}-${imgIndex}`} className={`carousel-item ${index === 0 && imgIndex === 0 ? "active" : ""}`}>
                <img
                  src={imagen}
                  className="img-fluid"
                  alt={product.nombre_producto}
                />
              </div>
            ))
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-slide="prev"
          data-bs-target="#carouselExampleAutoplaying"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-slide="next"
          data-bs-target="#carouselExampleAutoplaying"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
