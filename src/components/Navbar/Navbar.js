import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Button, ButtonGroup } from "@chakra-ui/react";
import "./navbar.scss";

function Navbar() {
  return (
    <div>
    <nav className="nav">
      <div className="left">
        <div className="logo">
          <Link to="/">eCommerce</Link>
        </div>
        <ul className="menu">
          <li>
            <Link to="/">Products</Link>
          </li>
        </ul>
      </div>

      <div className="right">
        <Link to="/login" className="login">
          <Button colorScheme="blue">Login</Button>
        </Link>
        <Link to="/signup" className="signup">
          <Button colorScheme="blue">SignUp</Button>
        </Link>
      </div>
    </nav>
    <Outlet/>

    </div>
  );
}

export default Navbar;
