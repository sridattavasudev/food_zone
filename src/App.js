import "./App.css";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Cards from "./pages/Cards";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Admin, { AddItems, AllOrders, UpdateItems } from "./pages/Admin";
import SignUp from "./pages/SignUp";
import Login, { ForgotPassword } from "./pages/Login";
import MyOrders from "./pages/MyOrders";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/all-orders" element={<AllOrders />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/add-items" element={<AddItems />} />
          <Route path="/update-items" element={<UpdateItems />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
