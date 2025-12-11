import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || "Login gagal. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <h4 className="fw-bold mb-1">Welcome back</h4>
                <p className="text-muted mb-4">Login untuk masuk ke dashboard</p>

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={onSubmit} className="d-grid gap-3">
                  <div>
                    <label className="form-label">Email</label>
                    <input
                      className="form-control"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="you@email.com"
                    />
                  </div>

                  <div>
                    <label className="form-label">Password</label>
                    <input
                      className="form-control"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                    />
                  </div>

                  <button className="btn btn-primary" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </form>

                <hr className="my-4" />
                <div className="text-muted small">
                  Endpoint: <code>POST /auth/login</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
