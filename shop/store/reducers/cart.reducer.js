import { ADD_TO_CART } from '../actions/cart.actions';
import { CartItem } from '../../models';

const initialState = {
  items: {},
  total: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.payload;
      const id = addedProduct.id;
      const productPrice = addedProduct.price;
      const productTitle = addedProduct.title;

      if (state.items[id]) {
        const updatedCartItem = new CartItem(
          state.items[id].quantity + 1,
          productPrice,
          productTitle,
          state.items[id].sum + productPrice
        );

        return {
          ...state,
          items: { ...state.items, [id]: updatedCartItem },
          total: state.total + productPrice,
        };
      } else {
        const newCartItem = new CartItem(1, productPrice, productTitle, productPrice);

        return {
          ...state,
          items: { ...state.items, [id]: newCartItem },
          total: state.total + newCartItem.sum,
        };
      }

    default:
      return state;
  }
};

export default cartReducer;
