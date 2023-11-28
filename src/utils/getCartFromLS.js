export const getCartFromLS = () => {
  const data = localStorage.getItem("cart");
  const items = data ? JSON.parse(data) : [];

  const totalPrice = items.reduce((sum, obj) => {
    return obj.price * obj.count + sum;
  }, 0);

  return {
    items,
    totalPrice,
  };
};
