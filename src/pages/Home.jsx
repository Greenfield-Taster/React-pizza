import React from "react";
import { useState } from "react";
import axios from "axios";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";

import pizzas from "../assets/pizzas.json";

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    axios
      .get("https://pizzas-backend.azurewebsites.net/pizzas")
      .then((response) => {
        console.log("Pizza data", response);

        setTimeout(() => {
          setItems(response.data);
          setIsLoading(false);
        }, 100);
      })
      .catch((error) => {
        console.log("Can`t connect to server: ", error);
      });

    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </div>
  );
};
export default Home;
