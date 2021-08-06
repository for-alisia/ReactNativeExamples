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

const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TO_CART:
      const id = payload.id;

      if (state.items[id]) {
        return changeQty({ id, state });
      } else {
        // ADD TOTAL NEW ITEM TO THE CART
        const cartItem = new CartItem(
          1,
          payload.price,
          payload.title,
          payload.price,
          payload.imageUrl
        );
        return {
          ...state,
          items: { ...state.items, [id]: cartItem },
          total: state.total + payload.price,
        };
      }

    case DELETE_FROM_CART:
      return changeQty({ id: payload, state, toBeDeleted: true });

    case SUBSTRACT_IN_CART:
      if (state.items[payload].quantity > 1) {
        return changeQty({ id: payload, state, substract: true });
      } else {
        return changeQty({ id: payload, state, toBeDeleted: true });
      }

    case ADD_IN_CART:
      return changeQty({ id: payload, state });

    default:
      return state;
  }
};

// To add, substract or delete existing items in cart
function changeQty(config) {
  const { id, state, toBeDeleted = false, substract = false, qty = 1 } = config;
  const selectedItem = state.items[id];
  const price = selectedItem.productPrice;
  const sum = selectedItem.sum;
  const updatedItems = { ...state.items };
  if (toBeDeleted) {
    delete updatedItems[id];
    return { ...state, items: updatedItems, total: state.total - sum };
  }
  updatedItems[id].quantity = substract
    ? updatedItems[id].quantity - qty
    : updatedItems[id].quantity + qty;
  updatedItems[id].summ = updatedItems[id].quantity * price;
  const newTotal = substract ? state.total - price : state.total + price * qty;

  return { ...state, items: updatedItems, total: newTotal };
}

export default cartReducer;
