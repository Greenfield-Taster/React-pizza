import { configureStore } from "@reduxjs/toolkit";
import counter from "./slices/filterSlice";
import cart from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    counter,
    cart,
  },
});
