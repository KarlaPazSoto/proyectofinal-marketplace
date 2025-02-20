import React from "react";

const PurchaseSummary = () => {
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
              readOnly
            />
            <button className="btn btn-warning">✔</button>
          </div>
        </div>

        {/* Resumen de precios */}
        <div className="mb-2">
          <p className="d-flex justify-content-between">
            <span>Número de productos:</span>
            <span>0</span>
          </p>
          <p className="d-flex justify-content-between">
            <span>Subtotal:</span>
            <span>$0 CLP</span>
          </p>
          <p className="d-flex justify-content-between">
            <span>Descuentos:</span>
            <span>$0 CLP</span>
          </p>
          <p className="d-flex justify-content-between">
            <span>Despacho:</span>
            <span>$3.000 CLP</span>
          </p>
        </div>

        {/* Total */}
        <h5 className="fw-bold d-flex justify-content-between">
          <span>Total:</span>
          <span>$3.000 CLP</span>
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
