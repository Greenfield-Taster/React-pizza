import React from "react";
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";
import "./scss/app.scss";

function App() {
  return (
    <div class="wrapper">
      <Header />
      <div class="content">
        <div class="container">
          <div class="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 class="content__title">Все пиццы</h2>
          <div class="content__items">
            <PizzaBlock title="Something1" price={500} />
            <PizzaBlock title="Something2" price={300} />
            <PizzaBlock title="Something3" price={600} />
            <PizzaBlock title="Something4" price={700} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
