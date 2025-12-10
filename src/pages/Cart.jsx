import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";

export default function Cart() {
  const { cart, updateQty, removeFromCart, subtotal } = useCart();
  const navigate = useNavigate();

  return (
    <div className="container py-4">
      <h4>Your Cart</h4>
      {cart.length === 0 ? (
        <div className="p-4 bg-light text-center">
          Your cart is empty. <Link to="/">Continue shopping</Link>
        </div>
      ) : (
        <div className="row">
          <div className="col-md-8">
            {cart.map(item => (
              <CartItem key={item.id} item={item} onChangeQty={updateQty} onRemove={removeFromCart} />
            ))}
          </div>
          <div className="col-md-4">
            <div className="card p-3">
              <h6>Order Summary</h6>
              <div className="d-flex justify-content-between">
                <div>Subtotal</div>
                <div>₹{subtotal.toLocaleString()}</div>
              </div>
              <div className="d-flex justify-content-between">
                <div>Shipping</div>
                <div>₹199</div>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <div>Total</div>
                <div>₹{(subtotal + 199).toLocaleString()}</div>
              </div>
              <button
                className="btn btn-primary w-100 mt-3"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
