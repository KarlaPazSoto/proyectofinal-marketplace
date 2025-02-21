import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";

const PurchaseSummary = () => {
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
    const fetchPurchaseSummary = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/purchase/summary', {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        setSummary(response.data);
      } catch (error) {
        console.error('Error fetching purchase summary:', error);
      }
    };

    if (user.token) {
      fetchPurchaseSummary();
    }
  }, [user]);

  const applyDiscountCode = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/discounts', {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      const discount = response.data.find(code => code.code === discountCode);
      if (discount) {
        setAppliedDiscount(discount);
        setSummary(prevSummary => ({
          ...prevSummary,
          discounts: discount.amount,
          total: prevSummary.subtotal + prevSummary.shippingCost - discount.amount
        }));
      } else {
        alert('Código de descuento no válido');
      }
    } catch (error) {
      console.error('Error applying discount code:', error);
    }
  };

  return (
    <div className="card border-danger p-3" style={{ maxWidth: "350px" }}>
      <div className="card-body">
        <h5 className="card-title fw-bold">Resumen de compra</h5>

        {/* Campo para el cupón de descuento */}
        <div className="mb-3">
          <label className="form-label">Cupón de descuento aplicado</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
            />
            <button className="btn btn-warning" onClick={applyDiscountCode}>✔</button>
          </div>
        </div>

        {/* Resumen de precios */}
        <div className="mb-2">
          <p className="d-flex justify-content-between">
            <span>Número de productos:</span>
            <span>{summary.numberOfProducts}</span>
          </p>
          <p className="d-flex justify-content-between">
            <span>Subtotal:</span>
            <span>${summary.subtotal.toLocaleString()} CLP</span>
          </p>
          <p className="d-flex justify-content-between">
            <span>Descuentos:</span>
            <span>${summary.discounts.toLocaleString()} CLP</span>
          </p>
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
        <button className="btn btn-info w-100 mt-3 fw-bold">
          Pedir nuevamente
        </button>
      </div>
    </div>
  );
};

export default PurchaseSummary;
