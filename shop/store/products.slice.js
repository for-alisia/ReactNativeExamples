import { createSlice } from '@reduxjs/toolkit';
import PRODUCTS from '../data';

const initialState = {
  availableProducts: PRODUCTS,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    createProduct: (state, { payload }) => {
      const newProduct = {
        id: new Date().toString(),
        title: payload.title,
        description: payload.description,
        imageUrl: payload.imageUrl,
        price: +payload.price,
        rate: 0,
        reviews: [],
      };

      state.availableProducts.push(newProduct);
    },
    updateProduct: (state, { payload }) => {
      const idx = state.availableProducts.findIndex((el) => el.id === payload.id);
      const newProduct = {
        id: payload.id,
        title: payload.title,
        description: payload.description,
        imageUrl: payload.imageUrl,
        price: +payload.price,
        rate: state.availableProducts[idx].rate,
        reviews: state.availableProducts[idx].reviews,
      };
      state.availableProducts[idx] = newProduct;
    },
    deleteProduct: (state, { payload }) => {
      state.availableProducts = state.availableProducts.filter((el) => el.id !== payload);
    },
  },
});

export const productActions = productsSlice.actions;

export default productsSlice.reducer;
