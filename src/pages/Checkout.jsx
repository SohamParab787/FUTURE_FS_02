// src/pages/Checkout.jsx
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });

  function onSubmit(e) {
    e.preventDefault();
    const orderId = `EM-${Date.now().toString(36).toUpperCase()}`;
    const order = { id: orderId, items: cart, total: subtotal + 199, customer: form, date: new Date().toISOString() };
    localStorage.setItem(`order_${orderId}`, JSON.stringify(order));
    clearCart();
    navigate(`/success?order=${orderId}`);
  }

  return (
    <div className="container py-4">
      <h4>Checkout</h4>
      <div className="row">
        <form className="col-md-7" onSubmit={onSubmit}>
          <div className="mb-2">
            <label className="form-label">Name</label>
            <input className="form-control" required value={form.name} onChange={e=>setForm(f=>({...f, name:e.target.value}))} />
          </div>
          <div className="mb-2">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" required value={form.email} onChange={e=>setForm(f=>({...f, email:e.target.value}))} />
          </div>
          <div className="mb-2">
            <label className="form-label">Phone</label>
            <input className="form-control" required value={form.phone} onChange={e=>setForm(f=>({...f, phone:e.target.value}))} />
          </div>
          <div className="mb-2">
            <label className="form-label">Address</label>
            <textarea className="form-control" rows="4" required value={form.address} onChange={e=>setForm(f=>({...f, address:e.target.value}))} />
          </div>

          <button className="btn btn-primary">Confirm Order</button>
        </form>

        <div className="col-md-5">
          <div className="card p-3">
            <h6>Order Summary</h6>
            {cart.map(i=>(
              <div key={i.id} className="d-flex justify-content-between small">
                <div>{i.qty} x {i.title}</div>
                <div>₹{(i.price * i.qty).toLocaleString()}</div>
              </div>
            ))}
            <hr />
            <div className="d-flex justify-content-between"><div>Subtotal</div><div>₹{subtotal.toLocaleString()}</div></div>
            <div className="d-flex justify-content-between"><div>Shipping</div><div>₹199</div></div>
            <hr />
            <div className="d-flex justify-content-between fw-bold"><div>Total</div><div>₹{(subtotal + 199).toLocaleString()}</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
