import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { cartService } from "../services/api";

const PurchaseSummary = ({ cartItems }) => {
  const { user } = useContext(UserContext);
  const [summary, setSummary] = useState({
    numberOfProducts: 0,
    subtotal: 0,
    discounts: 0,
    shippingCost: 3000,
    total: 3000,
  });
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(null);

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      const numberOfProducts = cartItems.reduce((sum, item) => sum + item.cantidad, 0);
      const subtotal = cartItems.reduce((sum, item) => sum + (item.cantidad * item.precio_unitario), 0);
      
      setSummary({
        numberOfProducts,
        subtotal,
        discounts: appliedDiscount?.amount || 0,
        shippingCost: 3000,
        total: subtotal + 3000 - (appliedDiscount?.amount || 0)
      });
    } else {
      setSummary({
        numberOfProducts: 0,
        subtotal: 0,
        discounts: 0,
        shippingCost: 3000,
        total: 3000
      });
    }
  }, [cartItems, appliedDiscount]);

  const applyDiscountCode = async () => {
    try {
      alert('Funcionalidad de descuentos en desarrollo');
    } catch (error) {
      console.error('Error al aplicar descuento:', error);
      alert('Error al aplicar el código de descuento');
    }
  };

  if (!user) {
    return <div className="card border-danger p-3">
      <div className="card-body">
        <p className="text-center">Inicia sesión para ver el resumen</p>
      </div>
    </div>;
  }

  return (
    <div className="card border-danger p-3" style={{ maxWidth: "350px" }}>
      <div className="card-body">
        <h5 className="card-title fw-bold">Resumen de compra</h5>

        {/* Campo para el cupón de descuento */}
        <div className="mb-3">
          <label className="form-label">Cupón de descuento</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              placeholder="Ingresa tu código"
            />
            <button 
              className="btn btn-warning" 
              onClick={applyDiscountCode}
              disabled={!discountCode}
            >
              ✔
            </button>
          </div>
        </div>

        {/* Resumen de precios */}
        <div className="mb-2">
          <p className="d-flex justify-content-between">
            <span>Productos:</span>
            <span>{summary.numberOfProducts}</span>
          </p>
          <p className="d-flex justify-content-between">
            <span>Subtotal:</span>
            <span>${summary.subtotal.toLocaleString()} CLP</span>
          </p>
          {summary.discounts > 0 && (
            <p className="d-flex justify-content-between text-success">
              <span>Descuentos:</span>
              <span>-${summary.discounts.toLocaleString()} CLP</span>
            </p>
          )}
          <p className="d-flex justify-content-between">
            <span>Despacho:</span>
            <span>${summary.shippingCost.toLocaleString()} CLP</span>
          </p>
        </div>

        {/* Total */}
        <h5 className="fw-bold d-flex justify-content-between">
          <span>Total:</span>
          <span>${summary.total.toLocaleString()} CLP</span>
        </h5>

        {/* Botón */}
        <button 
          className="btn btn-info w-100 mt-3 fw-bold"
          disabled={summary.numberOfProducts === 0}
          onClick={() => alert('Funcionalidad de pago en desarrollo')}
        >
          Proceder al pago
        </button>
      </div>
    </div>
  );
};

export default PurchaseSummary;
