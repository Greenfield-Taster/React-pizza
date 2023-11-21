import React from "react";
import { useState } from "react";
import axios from "axios";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState(0);

  React.useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://pizzas-backend.azurewebsites.net/pizzas")
      .then((response) => {
        console.log("Pizza data", response);
        setItems(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Can`t connect to server: ", error);
      });

    window.scrollTo(0, 0);
  }, []);

  console.log(categoryId, sortType);

  const filtredAndSortedPizzas = () => {
    let filtredItems = items;

    if (categoryId === 0) {
      filtredItems = items;
    } else {
      filtredItems = items.filter((item) => item.category === categoryId);
    }

    switch (sortType) {
      case 0:
        filtredItems = filtredItems.sort((a, b) => b.rating - a.rating);
        break;
      case 1:
        filtredItems = filtredItems.sort((a, b) => a.price - b.price);
        break;
      case 2:
        filtredItems = filtredItems.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        break;
      default:
        break;
    }

    return filtredItems;
  };

  const sortedAndFilteredPizzas = filtredAndSortedPizzas();

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(id) => setCategoryId(id)}
        />
        <Sort value={sortType} onChangeSort={(id) => setSortType(id)} />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : sortedAndFilteredPizzas.map((obj) => (
              <PizzaBlock key={obj._id} {...obj} />
            ))}
      </div>
    </div>
  );
};
export default Home;
