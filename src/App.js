import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/authorization/login/Login";
import SignUp from "./pages/authorization/SignUp/SignUp";
import Products from "./pages/Products/Products";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Profile from "./pages/authorization/Profile/Profile";
import { UseAuth } from "./contexts/AuthContext";
import Home from "./pages/Home/Home";
import AdminHome from "./pages/Admin/admin-home/Home";
import Orders from "./pages/Admin/orders/Orders";
import AdminProducts from "./pages/Admin/products/Products";
import Basket from "./pages/Basket/Basket";
import Error404 from "./pages/Error/Error404";
import OrderDetails from "./pages/OrderDetails/OrderDetails";
import { LoginPrivateRoutes } from "./pages/authorization/PrivateRoutes";
import { AdminPrivateRoutes } from "./pages/authorization/PrivateRoutes";
import Admin from "./pages/Admin/Admin";
import ProductDetail from "./pages/Admin/ProductDetail/ProductDetail";
import AddProduct from "./pages/Admin/AddProduct/AddProduct";
function App() {
  const { user } = UseAuth();
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="e-commerce" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="products" element={<Products />} />
          <Route path="product/:product_id" element={<ProductDetails />} />
          <Route path="basket" element={<Basket />} />
          <Route path="orderDetails" element={<OrderDetails />} />
          <Route path="*" element={<Error404 />} />
          {/* login yapmadan profile sayfasına giriş yetkisi vermez */}
          <Route
            path="profile"
            element={
              <LoginPrivateRoutes>
                <Profile />
              </LoginPrivateRoutes>
            }
          ></Route>

          {/* admin girişi yapmadan admin sayfasına giriş yetkisi vermez */}
          <Route
            path="admin"
            element={
              <AdminPrivateRoutes>
                <Admin />{" "}
              </AdminPrivateRoutes>
            }
          >
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/products/add" element={<AddProduct/>} />
          <Route path="/admin/products/:product_id" element={<ProductDetail />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
