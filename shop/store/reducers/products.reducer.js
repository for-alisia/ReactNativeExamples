import PRODUCTS from '../../data';
import { DELETE_PRODUCT } from '../actions/products.actions';

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === 'u1'),
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case DELETE_PRODUCT:
      return {
        ...state,
        availableProducts: state.availableProducts.filter((prod) => prod.id !== payload),
        userProducts: state.userProducts.filter((prod) => prod.id !== payload),
      };
    default:
      return state;
  }
};
