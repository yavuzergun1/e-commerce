import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import "./navbar.scss";
import { UseAuth } from "../../contexts/AuthContext";
import { UseBasket } from "../../contexts/BasketContext";

function Navbar() {
  const { isLogin } = UseAuth();
  const {items} = UseBasket();

console.log(items);

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

{items.length > 0 && (
  <Link to="/basket">
    <Button colorScheme="facebook" variant="outline" > Basket: {items.length} item </Button>
  </Link>
)}

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
