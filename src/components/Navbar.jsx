import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";  

export default function Navbar() {
  const [search, setSearch] = useState("");
  const { setSearchQuery } = useProducts();
  const { cart } = useCart();
  const { user, logout } = useAuth();  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(search);
    navigate("/products");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 shadow-sm main-navbar sticky-top">
      <Link className="navbar-brand fw-bold" to="/">ElectroMart</Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navMenu"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navMenu">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/products">Products</Link>
          </li>

          <li className="nav-item dropdown">
            <span
              className="nav-link dropdown-toggle"
              role="button"
              data-bs-toggle="dropdown"
              style={{ cursor: "pointer" }}
            >
              Categories
            </span>
            <ul className="dropdown-menu">
              <li><Link className="dropdown-item" to="/category/smartphones">Smartphones</Link></li>
              <li><Link className="dropdown-item" to="/category/laptops">Laptops</Link></li>
            </ul>
          </li>
        </ul>

        <form className="d-flex me-3" onSubmit={handleSubmit}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-outline-info" type="submit">Search</button>
        </form>

        <Link to="/cart" className="btn btn-warning position-relative cart-link me-3">
          Cart
          {cart.length > 0 && (
            <span className="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-pill cart-badge">
              {cart.reduce((sum, item) => sum + item.qty, 0)}
            </span>
          )}
        </Link>

        {user ? (
          <>
            
            <button className="btn btn-outline-light" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link className="btn btn-outline-light" to="/login">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
