import React from "react";
import { Link } from "react-router-dom";
import orderedCartImg from "../assets/img/ordered-cart.svg";

const OrderDone = () => {
  return (
    <div className="cart cart--empty">
      <h2>
        Thank you for your order<span>😀</span>
      </h2>
      <p>
        Мanager will contact you as soon as possible
        <br />
        Out cooks work hard to ensure you don't go hungry
      </p>
      <img src={orderedCartImg} alt="Empty cart" />
      <Link to="/React-pizza/" className="button button--black">
        <span>Come back</span>
      </Link>
    </div>
  );
};
export default OrderDone;
