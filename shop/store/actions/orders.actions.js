export const ADD_ORDER = 'ADD_ORDER';

export const addOrder = (cartItems, total) => {
  return {
    type: ADD_ORDER,
    payload: {
      items: cartItems,
      total,
    },
  };
};