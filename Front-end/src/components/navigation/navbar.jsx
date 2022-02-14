import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {

  return (
    <>
      <nav className="main-nav">
        <div className="logo">
          <h2>
            <span>Chit</span> Chat
          </h2>
        </div>

        <div
          className = "menu-link">
          <ul>
            <li>
              <NavLink to="/" className={(navdata) => navdata.isActive ? "activeClass" : ''}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/about" className={(navdata) => navdata.isActive ? "activeClass" : ''}>about</NavLink>
            </li>
          </ul>
        </div>
      </nav>

    </>
  );
};

export default Navbar;