// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-dark text-white mt-5">
      <div className="container py-4">
        <div className="row">
          <div className="col-md-4">
            <h5>ElectroMart</h5>
            <p>Modern electronics & accessories — curated selection.</p>
          </div>
          <div className="col-md-2">
            <h6>Shop</h6>
            <ul className="list-unstyled">
              <li><Link className="text-white" to="/category/smartphones">Smartphones</Link></li>
              <li><Link className="text-white" to="/category/laptops">Laptops</Link></li>
              <li><Link className="text-white" to="/products">All Products</Link></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h6>Support</h6>
            <ul className="list-unstyled">
              <li><a className="text-white" href="#!">Contact</a></li>
              <li><a className="text-white" href="#!">Shipping</a></li>
              <li><a className="text-white" href="#!">Returns</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h6>Newsletter</h6>
            <p className="small">Get the latest deals in your inbox.</p>
            <div className="d-flex">
              <input className="form-control form-control-sm" placeholder="Email" />
              <button className="btn btn-primary btn-sm ms-2">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="text-center mt-3 small">© {new Date().getFullYear()} ElectroMart</div>
      </div>
    </footer>
  );
}
