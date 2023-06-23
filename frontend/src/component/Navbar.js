import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Customer Management
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/create-customer">
              Create New Customer
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/create-service">
              Create New Service
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/pending-services">
              Pending Services
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
