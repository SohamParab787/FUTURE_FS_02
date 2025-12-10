// src/components/HeroCarousel.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function HeroCarousel() {
  const baseUrl = process.env.PUBLIC_URL || "";
const slides = [
  { id: 1, img: `${baseUrl}/images/banner1.jpg`, title: "Latest Smartphones", subtitle: "Top deals on new models", cta: "/category/smartphones" },
  { id: 2, img: `${baseUrl}/images/banner2.jpg`, title: "Laptops for Work & Play", subtitle: "Powerful machines for every need", cta: "/category/laptops" },
];


  // ensure images exist — if not, use unsplash fallback
  const ensureImg = (p) => {
    if (p.img) return p.img;
    return `https://source.unsplash.com/featured/?electronics,${encodeURIComponent(p.title)}`;
  };

  return (
    <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {slides.map((s, idx) => (
          <div key={s.id} className={`carousel-item ${idx === 0 ? "active" : ""}`}>
            <div style={{height: 420, background:`linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)), url(${ensureImg(s)}) center/cover no-repeat`}} className="d-flex align-items-center">
              <div className="container text-white">
                <h2 className="display-6">{s.title}</h2>
                <p className="lead">{s.subtitle}</p>
                <Link to={s.cta} className="btn btn-light">Shop {s.title.split(" ")[0]}</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" />
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" />
      </button>
    </div>
  );
}
