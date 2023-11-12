import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";

import "./scss/app.scss";

function App() {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("https://pizzas-backend.azurewebsites.net/pizzas")
      .then((response) => {
        console.log("Pizza data", response);
        setItems(response.data);
      })
      .catch((error) => {
        console.log("Can`t connect to server: ", error);
      });
  }, []);

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
