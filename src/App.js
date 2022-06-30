import "./App.css";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/authorization/Login";
import SignUp from "./pages/authorization/SignUp";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Navbar/>}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          {/* <Route path="products" element={<Products/>}/>
                <Route path="product/:product_id" element={<ProductDetail/>}/> */}
                </Route>
      </Routes>
    </BrowserRouter>
  );

}

export default App;
