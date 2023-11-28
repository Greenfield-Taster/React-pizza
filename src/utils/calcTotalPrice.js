import { CartItem } from "../redux/slices/cartSlice";

export const calcTotalPrice = (items: CartItem[]) => {
  return (state.totalPrice = state.items.reduce((sum, obj) => {
    return obj.price * obj.count + sum;
  }, 0));
};
