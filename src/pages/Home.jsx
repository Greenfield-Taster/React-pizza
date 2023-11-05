import React from 'react';

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";

import pizzas from "../assets/pizzas.json";

const Home = () => {
  return (
    <>
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
    </>
  )
}
export default Home;