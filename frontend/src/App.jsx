import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./toast.css"
import Search from "./pages/Search/Search";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [toastTheme, setToastTheme] = useState("dark");

  useEffect(() => {
    const mode = localStorage.getItem("mode");
    if (mode === "dark") {
      setToastTheme("dark");
    } else {
      setToastTheme("light");
    }
  }, []);

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={2500}
        theme={toastTheme}
        toastClassName="toast-container"
      />
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/Search" element={<Search />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
