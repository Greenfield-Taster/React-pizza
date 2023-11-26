import React from "react";
import { Link } from "react-router-dom";
import cartEmptyImg from "../assets/img/empty-cart.png";

const CartEmpty = () => {
  return (
    <div className="cart cart--empty">
      <h2>
        Cart is empty <span>😕</span>
      </h2>
      <p>
        Looks like you haven't ordered pizza yet.
        <br />
        To order pizza, go to the main page.
      </p>
      <img src={cartEmptyImg} alt="Empty cart" />
      <Link to="/React-pizza/" className="button button--black">
        <span>Come back</span>
      </Link>
    </div>
  );
};
export default CartEmpty;
