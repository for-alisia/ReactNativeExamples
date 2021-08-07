export const ADD_TO_CART = 'ADD_TO_CART';
export const DELETE_FROM_CART = 'DELETE_FROM_CART';
export const ADD_IN_CART = 'ADD_IN_CART';
export const SUBSTRACT_IN_CART = 'SUBSTRACT_IN_CART';
export const CLEAR_CART = 'CLEAR_CART';

export const addToCart = (product) => {
  return {
    type: ADD_TO_CART,
    payload: product,
  };
};

export const deleteFromCart = (productId) => {
  return {
    type: DELETE_FROM_CART,
    payload: productId,
  };
};

export const addInCart = (productId) => {
  return {
    type: ADD_IN_CART,
    payload: productId,
  };
};

export const substractInCart = (productId) => {
  return {
    type: SUBSTRACT_IN_CART,
    payload: productId,
  };
};

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};
