// src/pages/Home.jsx
import React from "react";
import HeroCarousel from "../components/HeroCarousel";
import { useProducts } from "../context/ProductsContext";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

export default function Home() {
  const { products, loading } = useProducts();

  if (loading) return <div className="container py-5">Loading products...</div>;

  // featured: top rated
  const featured = [...products].sort((a,b)=>b.rating-a.rating).slice(0, 8);

  const categories = [...new Set(products.map(p => p.category))].slice(0, 8);

  return (
    <div>
      <HeroCarousel />

      <div className="container py-4">
        <h4 className="mb-3">Categories</h4>
        <div className="row g-3 mb-4">
          {categories.map(cat => (
            <div key={cat} className="col-6 col-md-3">
              <Link to={`/category/${cat}`} className="card p-3 text-center text-decoration-none">
                <div className="h5 text-capitalize">{cat}</div>
              </Link>
            </div>
          ))}
        </div>

        <h4 className="mb-3">Featured Products</h4>
        <div className="row g-3">
          {featured.map(p => (
            <div key={p.id} className="col-6 col-md-3">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
