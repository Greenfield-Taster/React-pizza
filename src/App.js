import React, { useState } from "react";
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import Skeleton from "./components/PizzaBlock/Skeleton";
import PizzaBlock from "./components/PizzaBlock";

import pizzas from "./assets/pizzas.json";

import "./scss/app.scss";

function App() {
  // const [isLoading, setLoading] = useState(true); // TODO make <content__items> check for skeleton or PizzaBlock

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">All pizzas</h2>
          <div className="content__items">
            {pizzas.map((obj) => (
              <PizzaBlock key={obj.id} {...obj} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
