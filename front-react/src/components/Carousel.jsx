import React from "react";
import data from '../data/db.json'
import "../styles/Carousel.css";

const Carousel = () => {
  return (
    <div>
              <div
          id="carouselExampleAutoplaying"
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval="2000"
        >
          <div className="carousel-inner carousel-image">
          {data.products.map((product, index) => (
                        <div key={product.id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                          <img
                          src={product.img}
                          className="img-fluid"
                          alt={product.name}
                        />
                      </div>
          ))}

          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-slide="prev"
            data-bs-target="#carouselExampleInterval"
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
            data-bs-target="#carouselExampleInterval"
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
