import {
  ADD_TO_CART,
  DELETE_FROM_CART,
  SUBSTRACT_IN_CART,
  ADD_IN_CART,
} from '../actions/cart.actions';
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
    case DELETE_FROM_CART:
      // Find an element to delete
      const itemToDelete = state.items[action.payload];
      // Reduce total
      const newTotal = state.total - itemToDelete.sum;
      // Delete element
      const updatedItems = { ...state.items };
      delete updatedItems[action.payload];
      return { ...state, items: updatedItems, total: newTotal };
    case SUBSTRACT_IN_CART:
      const selectedCartItem = state.items[action.payload];
      const currentQty = selectedCartItem.quantity;
      const currentPrice = selectedCartItem.productPrice;
      let updItems = { ...state.items };
      // If we need to update a qty
      if (currentQty > 1) {
        updItems[action.payload].quantity--;
        updItems[action.payload].sum = updItems[action.payload].quantity * currentPrice;
      } else {
        // Delete item from cart
        delete updItems[action.payload];
      }
      const updTotal = state.total - currentPrice;
      return { ...state, items: updItems, total: updTotal };
    case ADD_IN_CART:
      const selectItem = state.items[action.payload];
      const newSumTotal = state.total + selectItem.productPrice;
      const updItemsInState = { ...state.items };
      updItemsInState[action.payload].quantity++;
      updItemsInState[action.payload].sum =
        updItemsInState[action.payload].quantity * selectItem.productPrice;

      return { ...state, items: updItemsInState, total: newSumTotal };
    default:
      return state;
  }
};

export default cartReducer;
