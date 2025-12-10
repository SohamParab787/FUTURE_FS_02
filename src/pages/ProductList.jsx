import React from "react";
import { Link, useParams } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import { useCart } from "../context/CartContext";

export default function ProductList() {
  const { category } = useParams();
  const { products, searchQuery = "" } = useProducts();  
  const { cart, addToCart } = useCart();

  const filtered = products.filter((p) => {
    const matchCategory = category ? p.category === category : true;
    const matchSearch = (p.title || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const getQuantity = (id) => {
    const item = cart.find((c) => c.id === id);
    return item ? item.qty : 0;  
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">{category ? category.toUpperCase() : "All Products"}</h2>
      <div className="row g-4">
        {filtered.map((p) => {
          const quantity = getQuantity(p.id);
          return (
            <div className="col-md-3" key={p.id}>
              <div className="card h-100 shadow-sm product-card">
                <img
                  src={process.env.PUBLIC_URL + p.thumbnail}
                  alt={p.title}
                    className="card-img-top"
                   style={{ height: "220px", objectFit: "contain", backgroundColor: "#fff", padding: "8px" }}
                />

                <div className="card-body d-flex flex-column">
                  <h5>{p.title}</h5>
                  <p className="text-muted">₹{p.price}</p>

                  {quantity === 0 ? (
                    <button
                      className="btn btn-primary mt-auto"
                      onClick={() => addToCart(p, 1)}
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <div className="d-flex align-items-center gap-2 mt-auto">
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => addToCart(p, -1)}
                      >
                        -
                      </button>
                      <span className="fw-bold fs-5">{quantity}</span>
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => addToCart(p, 1)}
                      >
                        +
                      </button>
                    </div>
                  )}

                  <Link
                    to={`/product/${p.id}`}
                    className="btn btn-outline-primary mt-2"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
