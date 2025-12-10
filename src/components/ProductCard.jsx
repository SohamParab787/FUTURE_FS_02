import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const hasDiscount = product.discountPercentage && product.discountPercentage > 0;
  const finalPrice = Math.round(product.price * (1 - (product.discountPercentage || 0) / 100));

  return (
    <div className="card h-100 product-card">
      <Link to={`/product/${product.id}`}>
        <img 
          src={process.env.PUBLIC_URL + product.thumbnail} 
          className="card-img-top" 
          alt={product.title} 
          style={{ height: 180, objectFit: "cover" }} 
        />
      </Link>
      <div className="card-body d-flex flex-column">
        <h6 className="card-title" style={{ minHeight: 44 }}>{product.title}</h6>
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div>
              {hasDiscount ? (
                <>
                  <div className="fw-bold">₹{finalPrice.toLocaleString()}</div>
                  <div className="text-muted small">
                    <s>₹{product.price.toLocaleString()}</s> <span className="badge bg-success ms-1">{product.discountPercentage}% off</span>
                  </div>
                </>
              ) : (
                <div className="fw-bold">₹{product.price.toLocaleString()}</div>
              )}
            </div>
            <div className="text-end small">
              <div>⭐ {product.rating}</div>
            </div>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-sm btn-primary w-100" onClick={() => addToCart(product, 1)}>Add to Cart</button>
            <Link to={`/product/${product.id}`} className="btn btn-sm btn-outline-secondary">View</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
