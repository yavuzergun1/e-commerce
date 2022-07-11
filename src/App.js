import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/authorization/login/Login";
import SignUp from "./pages/authorization/SignUp/SignUp";
import Products from "./pages/Products/Products";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Profile from "./pages/authorization/Profile/Profile";
import { PrivateRoutes } from "./pages/authorization/PrivateRoutes";
import { UseAuth } from "./contexts/AuthContext";
function App() {
  const {user} = UseAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Navbar />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="products" element={<Products />} />
          <Route path="product/:product_id" element={<ProductDetails />} />
          {/* Profile Route'unu PrivateRoutes ile sarmalıyoruz.  */}
          <Route element={<PrivateRoutes/>}>  
          <Route path="profile" element={<Profile/>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
