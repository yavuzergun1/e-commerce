import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/authorization/Login";
import SignUp from "./pages/authorization/SignUp";
import Products from "./pages/Products/Products";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Navbar />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="products" element={<Products />} />
          <Route path=":product_id" element={<ProductDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
