import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
function App() {
  return (
    <BrowserRouter>
    <Routes>
            <Route path="/*" element={<Navbar/>}>
                {/* <Route path="signin"  element={<Signin/>}/>
                <Route path="signup" element={<Signup/>}/>
                <Route path="products" element={<Products/>}/>
                <Route path="product/:product_id" element={<ProductDetail/>}/> */}

            </Route>
    </Routes>
</BrowserRouter>
  );
}

export default App;
