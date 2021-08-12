// @ts-nocheck
import { createSlice } from '@reduxjs/toolkit';
import { productsAPI } from '../fetchAPI';

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
        rate: 3.5,
        reviews: [],
      };

      state.availableProducts.push(newProduct);
    },
    productUpdated: (state, { payload }) => {
      const { id, title, description, imageUrl, price } = payload;
      const idx = state.availableProducts.findIndex((el) => el.id === payload.id);
      const newProduct = {
        id,
        title,
        description,
        imageUrl,
        price: +price,
        rate: state.availableProducts[idx].rate,
        reviews: state.availableProducts[idx].reviews,
      };
      state.availableProducts[idx] = newProduct;
    },
    productDeleted: (state, { payload }) => {
      state.availableProducts = state.availableProducts.filter((el) => el.id !== payload);
    },
  },
});

export const productActions = productsSlice.actions;

// Fetch products from server
export const fetchProducts = () => async (dispatch) => {
  try {
    const products = await productsAPI.getProducts();
    dispatch(productActions.setProducts(products));
  } catch (err) {
    throw err;
  }
};
// Create new product
export const createProduct =
  ({ title, description, imageUrl, price }) =>
  async (dispatch) => {
    try {
      const product = await productsAPI.createProduct({ title, description, imageUrl, price });
      dispatch(productActions.productCreated(product));
    } catch (err) {
      throw err;
    }
  };
// Updating product
export const updateProduct =
  ({ title, description, imageUrl, id, price }) =>
  async (dispatch) => {
    try {
      const isSuccessed = await productsAPI.updateProduct({
        title,
        description,
        imageUrl,
        id,
        price,
      });
      if (isSuccessed) {
        dispatch(productActions.productUpdated({ title, description, imageUrl, id, price }));
      }
    } catch (err) {
      throw err;
    }
  };

// Deleting product
export const deleteProduct = (productId) => async (dispatch) => {
  try {
    const isSuccessed = await fetchAPI.deleteProduct(productId);
    if (isSuccessed) {
      dispatch(productActions.productDeleted(productId));
    }
  } catch (err) {
    throw err;
  }
};

export default productsSlice.reducer;
