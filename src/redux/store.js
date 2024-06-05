import { configureStore } from "@reduxjs/toolkit";
import counter from "./slices/filterSlice";
import cart from "./slices/cartSlice";
import pizza from "./slices/pizzaSlice";
import user from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    counter,
    cart,
    pizza,
    user,
  },
});
