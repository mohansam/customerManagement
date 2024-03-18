import React, { useState } from "react";
import { NavLink } from "react-router-dom"; // Import NavLink

const Navbar = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  const closeNav = () => setIsNavCollapsed(true);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink className="navbar-brand" to="/" onClick={closeNav}>
        Customer Management
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        onClick={handleNavCollapse}
        aria-controls="navbarNav"
        aria-expanded={!isNavCollapsed}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
        id="navbarNav"
      >
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/create-customer"
              onClick={closeNav}
              activeClassName="active"
            >
              Create New Customer
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/create-product"
              onClick={closeNav}
              activeClassName="active"
            >
              Create New Product
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/create-service"
              onClick={closeNav}
              activeClassName="active"
            >
              Create New Service
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/pending-services"
              onClick={closeNav}
              activeClassName="active"
            >
              Pending Services
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/upcoming-services"
              onClick={closeNav}
              activeClassName="active"
            >
              Upcoming Services
            </NavLink>
          </li>
          {/* <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/check-customer-details"
              onClick={closeNav}
              activeClassName="active"
            >
              Check Customer Details
            </NavLink>
          </li> */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
