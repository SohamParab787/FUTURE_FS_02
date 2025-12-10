// src/pages/OrderSuccess.jsx
import React from "react";
import { useLocation, Link } from "react-router-dom";

export default function OrderSuccess() {
  const params = new URLSearchParams(useLocation().search);
  const order = params.get("order");
  const orderData = order ? JSON.parse(localStorage.getItem(`order_${order}`) || null) : null;

  return (
    <div className="container py-5">
      <div className="card p-4 text-center">
        <h3>Thank you for your order!</h3>
        {order ? (
          <>
            <p className="mb-2">Your order id: <strong>{order}</strong></p>
            <p>We've sent a confirmation to <strong>{orderData?.customer?.email}</strong></p>
          </>
        ) : <p>Order completed.</p>}
        <Link to="/" className="btn btn-primary mt-3">Back to Home</Link>
      </div>
    </div>
  );
}
