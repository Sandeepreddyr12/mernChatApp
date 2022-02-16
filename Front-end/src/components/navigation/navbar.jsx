import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {


const [currentClass, setcurrentClass] = useState("")

const tabSwitcher = (cssClass) => {
  setcurrentClass(cssClass)
  return "activeClass";
}



  return (
    <div className="navbar">
  <ul className= {currentClass}>
  <li><NavLink to="/" className={(navdata) => navdata.isActive ? tabSwitcher("chats"): ''}>Chats</NavLink></li>
  <li><NavLink to="/people" className={(navdata) => navdata.isActive ? tabSwitcher("people") : ''}>People</NavLink></li>
  <li><NavLink to="/profile" className={(navdata) => navdata.isActive ?  tabSwitcher("profile") : ''}>Profile</NavLink></li>
</ul>
</div>
  );
};

export default Navbar;