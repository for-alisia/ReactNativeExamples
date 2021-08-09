import PRODUCTS from '../../data';
import { DELETE_PRODUCT, UPDATE_PRODUCT, CREATE_PRODUCT } from '../actions/products.actions';
import Product from '../../models/product';

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === 'u1'),
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_PRODUCT:
      const newProduct = new Product(
        new Date().toString(),
        'u1',
        payload.title,
        payload.imageURL,
        payload.decription,
        +payload.price,
        0
      );
      return {
        ...state,
        availableProducts: [...state.availableProducts, newProduct],
        userProducts: [...state.userProducts, newProduct],
      };
    case UPDATE_PRODUCT:
      const productIdx = state.userProducts.findIndex((item) => item.id === payload.id);
      const updatedProduct = new Product(
        payload.id,
        'u1',
        payload.title,
        payload.imageURL,
        payload.description,
        +payload.price,
        state.userProducts[productIdx].rate
      );
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIdx] = updatedProduct;
      const avProductIdx = state.availableProducts.findIndex((item) => item.id === payload.id);
      const updatedAllProducts = [...state.availableProducts];
      updatedAllProducts[avProductIdx] = updatedProduct;

      return { ...state, availableProducts: updatedAllProducts, userProducts: updatedUserProducts };
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
