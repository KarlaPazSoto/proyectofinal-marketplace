import React from "react";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { UserContext } from "../contexts/UserContext";
import data from "../data/db.json";
import "../styles/cart.css";
import PurchaseSummary from "./PurchaseSummary";

const Cart = () => {
  const {
    cart,
    total,
    handleIncrease,
    handleDecrease,
    handleRemove,
    handleClearCart,
    handleCheckout,
  } = useContext(CartContext);
  const { user } = useContext(UserContext);

  return (
    <div className="container d-flex">
      <h2 className="text-center">Tu Carrito</h2>
      <div>
      <div className="container-fluid">
        {cart.length > 0 ? (
          cart.map((product) => (
            <ul key={product.id}>
              <li className="li_cart">
                <div className="containerLi d-flex">
                  <div className="d-flex align-items-center col-4">
                    <div
                      className="col-4 text-center"
                      onClick={() => handleDecrease(product.id)}
                    >
                      <button type="button" className="btn btn-dark">
                        -
                      </button>
                    </div>
                    <div className="col-4">
                      <img src={product.img} alt={product.name} className="img-fluid" />
                    </div>
                    <div
                      className="col-4 text-center"
                      onClick={() => handleIncrease(product.id)}
                    >
                      <button type="button" className="btn btn-dark">
                        +
                      </button>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-evenly col-6">
                    <div className="col-4">
                      <p>{product.name}</p>
                    </div>
                    <div className="col-4">
                      <p>{product.price}</p>
                    </div>
                    <div className="col-4">
                      <p>{product.quantity}</p>
                    </div>
                  </div>
                  <div className="col-2 d-flex align-items-center justify-content-center">
                    <button
                      type="button"
                      className="btn btn-dark"
                      onClick={() => handleRemove(product.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </li>
              <hr />
            </ul>
          ))
        ) : (
          <p className="text-center">El carrito está vacío.</p>
        )}
      </div>
      <div className="text-center mt-4">
        <h4>Total: {total}</h4>
        <button
          className="btn btn-dark m-3"
          onClick={handleCheckout}
          disabled={cart.length === 0}
        >
          Pagar
        </button>
        <button
            className="btn btn-dark m-3"
            onClick={handleClearCart}
            disabled={cart.length === 0}
          >
            Vaciar Carrito
          </button>
      </div>
      </div>
      <div>
      <PurchaseSummary/>
      </div>

    </div>
  );
};

export default Cart;
