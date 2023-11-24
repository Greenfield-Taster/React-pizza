import React from "react";
import { Link } from "react-router-dom";

const CartEmpty = () => {
  return (
    <div className="content__items">
      <h3>CartEmpty</h3>
      <Link to="/React-pizza/">
        <span>Come back</span>
      </Link>
    </div>
  );
};
export default CartEmpty;
