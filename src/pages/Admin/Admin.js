import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import "./admin.scss";
function Admin() {
  return (
    <div>
      <nav>
        <ul className="admin-menu">
          <li>
            <Link to="/admin/home">Home</Link>
          </li>
          <li>
            <Link to="/admin/orders">Orders</Link>
          </li>
          <li>
            <Link to="/admin/products">Products</Link>
          </li>
        </ul>
      </nav>
      <Box></Box>
      <Outlet/>
    </div>
  );
}

export default Admin;
