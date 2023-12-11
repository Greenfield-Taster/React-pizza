import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import CartOrder from "./components/CartOrder";
import FullPizza from "./pages/FullPizza";
import CartOrderDone from "./components/CartOrderDone";

import "./scss/app.scss";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="React-pizza/" element={<Home />} />;
          <Route path="/cart" element={<Cart />} />;
          <Route path="/cart/order" element={<CartOrder />} />;
          <Route path="/cart/order-done" element={<CartOrderDone />} />;
          <Route path="/React-pizza/:pizzaId" element={<FullPizza />} />;
          <Route path="*" element={<NotFound />} />;
        </Routes>
      </div>
    </div>
  );
}

export default App;
