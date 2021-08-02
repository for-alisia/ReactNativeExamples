import { ADD_TO_CART } from '../actions/cart.actions';
import { CartItem } from '../../models';

const initialState = {
  items: {},
  total: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    // ADD ITEM TO CART
    case ADD_TO_CART:
      const addedProduct = action.payload;
      const id = addedProduct.id;
      const productPrice = addedProduct.price;
      const productTitle = addedProduct.title;
      const productImage = addedProduct.imageUrl;
      let cartItem;

      if (state.items[id]) {
        // HAVE AN ITEM IN THE CART -> UPDATE QTY AND TOTAL
        cartItem = new CartItem(
          state.items[id].quantity + 1,
          productPrice,
          productTitle,
          state.items[id].sum + productPrice,
          productImage
        );
      } else {
        // ADD TOTAL NEW ITEM TO THE CART
        cartItem = new CartItem(1, productPrice, productTitle, productPrice, productImage);
      }
      return {
        ...state,
        items: { ...state.items, [id]: cartItem },
        total: state.total + productPrice,
      };

    default:
      return state;
  }
};

export default cartReducer;
