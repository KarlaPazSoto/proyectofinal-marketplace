import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import data from '../data/db.json'
import "../styles/card.css";

const Card = () => {
  const {handleAddToCart} = useContext(CartContext)
  // const products = Array.from({ length: 12 }, (_, i) => ({
  //   id: i + 1,
  //   name: `Producto ${i + 1}`,
  //   price: `$${Math.floor(Math.random() * 200) + 50}.99`,
  //   image: `/product${i + 1}.jpg`
  // }));
  return (
    <div>
          <div className='container-fluid justify-content-evenly row lexend_font'>
      {data.products.map((product) => (
        <div key={product.id} className="card col-md-3 p-0 m-3" style={{ width: "18rem" }}>
          <div className="containerCartaImagen">
            <img src={product.img} className="card-img-top" alt={product.name} />
          </div>
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            
            <p className="text-center">{product.description}</p>
            <p className="card-text text-center"><strong>Precio: ${product.price}</strong></p>
            <div className="d-flex justify-content-evenly">
              <Link to='/post-details'><button className="btn btn-dark">
                Ver más
              </button></Link>
              <button className="btn btn-dark" onClick={() => handleAddToCart(product)}>Añadir</button>
            </div>
          </div>
        </div>
      ))}
    </div>

      {/* <div className="row">
        {products.map((product) => {
          <div className="col" key={product.id}>
        <div className="card" style={{ width: "18rem" }}>
          <img
            src={product.image}
            className="card-img-top"
            alt=""
          />
          <div className="card-body">
            <h5 className="card-title text-center">{product.name}</h5>
            <p className="card-text text-center">
              {product.description}
            </p>
            <p className="card-text text-center">
              {product.price}
            </p>
            <div className="d-flex justify-content-evenly">
              <a href="#" className="btn-1 btn btn-primary m-1 text-center">
                boton pal carro
              </a>
              <a href="#" className="btn-2 btn btn-primary m-1 text-center">
                boton pa detalles
              </a>
            </div>
          </div>
        </div>
          </div>
        })}
      </div> */}


      {/* { <div className="container-fluid justify-content-center">
        <div className="card" style={{ width: "18rem" }}>
          <img
            src="https://th.bing.com/th/id/OIP.XQVfxcLIC4qD6gnWN6JX2gHaHS?rs=1&pid=ImgDetMain"
            className="card-img-top"
            alt=""
          />
          <div className="card-body">
            <h5 className="card-title text-center">Yo lo habia ponido ahí</h5>
            <p className="card-text text-center">
              Card de ejemplo que se va a iterar cuando tengamos la base datos
              :3
            </p>
            <div className="d-flex justify-content-evenly">
              <a href="#" className="btn-1 btn btn-primary m-1 text-center">
                boton pal carro
              </a>
              <a href="#" className="btn-2 btn btn-primary m-1 text-center">
                boton pa detalles
              </a>
            </div>
          </div>
        </div>
      </div> } */}
    </div>
  );
};

export default Card;
