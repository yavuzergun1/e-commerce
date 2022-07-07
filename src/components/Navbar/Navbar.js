import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import "./navbar.scss";
import { UseAuth } from "../../contexts/AuthContext";

function Navbar() {
  const { isLogin } = UseAuth();
  console.log(isLogin);
  return (
    <div>
      <nav className="nav">
        <div className="left">
          <div className="logo">
            <Link to="/">eCommerce</Link>
          </div>
          <ul className="menu">
            <li>
              <Link to="/products">Products</Link>
            </li>
          </ul>
        </div>

        <div className="right">
          {!isLogin && (
            <>
              <Link to="/login" className="login">
                <Button colorScheme="blue">Login</Button>
              </Link>
              <Link to="/signup" className="signup">
                <Button colorScheme="blue">SignUp</Button>
              </Link>
            </>
          )}

          {isLogin && (
            <>
            <Link to="/profile" className="profile">
                <Button colorScheme="blue">Profile</Button>
              </Link>
            </>
          )

          }
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default Navbar;
