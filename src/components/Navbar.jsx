import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand fw-semibold" to="/">
          Admin Panel
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/users">
                Users
              </NavLink>
            </li>
            <li className ="nav-item">
              <NavLink className="nav-link" to="/employees">
                Pegawai
              </NavLink>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2">
            <span className="text-white-50 small">
              {user?.name ? `Hi, ${user.name}` : ""}
            </span>
            <button className="btn btn-outline-light btn-sm" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
