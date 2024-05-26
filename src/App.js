import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import FullPizza from "./pages/FullPizza";
import OrderDone from "./components/OrderDone";
import Profile from "./components/Profile/Profile";

import "./scss/app.scss";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="React-pizza/" element={<Home />} />;
          <Route path="/cart" element={<Cart />} />;
          <Route path="/cart/order" element={<Order />} />;
          <Route path="/cart/order-done" element={<OrderDone />} />;
          <Route path="/React-pizza/:pizzaId" element={<FullPizza />} />;
          <Route path="*" element={<NotFound />} />;
          <Route path="/profile" element={<Profile />} />;
        </Routes>
      </div>
    </div>
  );
}

export default App;
