import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const { products } = useProducts();
  const { addToCart, cart } = useCart();

  const product = products.find((p) => p.id === Number(id));
  const [activeImg, setActiveImg] = useState(product?.images[0]);

  const cartItem = cart.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.qty : 0;

  if (!product) return <div className="container py-4">Product not found</div>;

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-md-6 text-center">
          <img
  src={process.env.PUBLIC_URL + activeImg}
  alt={product.title}
  className="img-fluid mb-3"
  style={{ maxHeight: "400px", objectFit: "contain", borderRadius: "6px" }}
/>

<div className="d-flex justify-content-center gap-3 flex-wrap">
  {product.images.map((img, i) => (
    <img
      key={i}
      src={process.env.PUBLIC_URL + img}
      alt={`Thumbnail ${i + 1}`}
      style={{
        width: "90px",
        height: "90px",
        objectFit: "cover",
        cursor: "pointer",
        border: activeImg === img ? "3px solid #007bff" : "1px solid #ddd",
        borderRadius: "6px",
      }}
      onClick={() => setActiveImg(img)}
    />
  ))}
</div>

        </div>

        <div className="col-md-6">
          <h2>{product.title}</h2>
          <h4 className="text-danger">₹{product.price}</h4>
          <p>{product.description}</p>

          <div className="d-flex align-items-center gap-3 mt-3">
            {quantity === 0 ? (
              <button
                className="btn btn-primary"
                onClick={() => addToCart(product, 1)}
              >
                Add to Cart
              </button>
            ) : (
              <>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => addToCart(product, -1)}
                >
                  -
                </button>
                <span className="fw-bold fs-5">{quantity}</span>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => addToCart(product, 1)}
                >
                  +
                </button>
              </>
            )}
          </div>

          {/* Reviews Section */}
          <div className="mt-5">
            <h4>Reviews</h4>
            {product.reviews && product.reviews.length > 0 ? (
              <ul className="list-group">
                {product.reviews.map((review) => (
                  <li key={review.id} className="list-group-item">
                    <div>
                      <strong>{review.user}</strong> — <small>Rating: {review.rating} / 5</small>
                    </div>
                    <p>{review.comment}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No reviews yet. Be the first to review this product!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
