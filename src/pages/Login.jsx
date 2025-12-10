import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);

  function onSubmit(e) {
    e.preventDefault();
    const success = login(form.username, form.password);
    if (success) {
      setError(null);
      navigate("/"); 
    } else {
      setError("Invalid username or password");
    }
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card p-4">
            <h5>Login</h5>
            <form onSubmit={onSubmit}>
              <div className="mb-2">
                <label className="form-label">Username</label>
                <input
                  className="form-control"
                  value={form.username}
                  onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                  required
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  required
                />
              </div>

              {error && <div className="alert alert-danger">{error}</div>}

              <button className="btn btn-primary w-100" type="submit">Login</button>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
