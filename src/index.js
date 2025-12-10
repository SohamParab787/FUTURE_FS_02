import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";   // <-- change here
import App from "./App";
import { ProductsProvider } from "./context/ProductsContext";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ProductsProvider>
      <AuthProvider>
        <CartProvider>
          <HashRouter> 
            <App />
          </HashRouter>
        </CartProvider>
      </AuthProvider>
    </ProductsProvider>
  </React.StrictMode>
);
