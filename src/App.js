import React, { Component } from "react";

import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "./redux/slices/filterSlice";

import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";

import "./scss/app.scss";

function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="React-pizza/" element={<Home />} />;
          <Route path="/cart" element={<Cart />} />;
          <Route path="*" element={<NotFound />} />;
        </Routes>
      </div>
    </div>
  );
}

export default App;
