// @ts-nocheck
import { createSlice } from '@reduxjs/toolkit';
import PRODUCTS from '../data';

const initialState = {
  availableProducts: [],
  isLoading: false,
  hasError: false,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, { payload }) => {
      state.availableProducts = payload;
    },
    productCreated: (state, { payload }) => {
      const { title, description, imageUrl, price, id } = payload;
      const newProduct = {
        id,
        title,
        description,
        imageUrl,
        price: +price,
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

export const fetchProducts = () => async (dispatch) => {
  try {
    const response = await fetch(
      'https://react-4866c-default-rtdb.europe-west1.firebasedatabase.app/products.json'
    );
    const resData = await response.json();

    const loadedProducts = [];

    for (let key in resData) {
      loadedProducts.push({ id: key, ...resData[key], price: +resData[key].price });
    }

    dispatch(productActions.setProducts(loadedProducts));
  } catch (err) {}
};

export const createProduct =
  ({ title, description, imageUrl, price }) =>
  async (dispatch) => {
    try {
      const response = await fetch(
        'https://react-4866c-default-rtdb.europe-west1.firebasedatabase.app/products.json',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, description, imageUrl, price, rate: 3.5, reviews: [] }),
        }
      );
      const resData = await response.json();

      dispatch(
        productActions.productCreated({ id: resData.name, title, description, imageUrl, price })
      );
    } catch (err) {}
  };

export default productsSlice.reducer;
