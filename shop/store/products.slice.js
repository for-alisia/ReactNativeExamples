// @ts-nocheck
import { createSlice } from '@reduxjs/toolkit';
import { fetchAPI } from '../fetchAPI';
import * as Notifications from 'expo-notifications';

const initialState = {
  availableProducts: [],
  isLoading: false,
  error: null,
  isSuccessed: false,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, { payload }) => {
      state.availableProducts = payload;
      state.isLoading = false;
      state.error = null;
      state.isSuccessed = false;
    },
    startLoading: (state) => {
      state.isLoading = true;
      state.error = null;
      state.isSuccessed = false;
    },
    setError: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
      state.isSuccessed = false;
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
      state.isLoading = false;
      state.error = null;
      state.isSuccessed = true;
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
      state.isLoading = false;
      state.error = null;
      state.isSuccessed = true;
    },
    productDeleted: (state, { payload }) => {
      state.availableProducts = state.availableProducts.filter((el) => el.id !== payload);
      state.isLoading = false;
      state.error = null;
      state.isSuccessed = true;
    },
  },
});

export const productActions = productsSlice.actions;

// Fetching products
export const fetchProducts = () => async (dispatch) => {
  dispatch(productActions.startLoading());
  try {
    const products = await fetchAPI.getData('products');
    const loadedProducts = [];

    for (let key in products) {
      loadedProducts.push({ id: key, ...products[key], price: +products[key].price });
    }

    dispatch(productActions.setProducts(loadedProducts));
  } catch (err) {
    dispatch(productActions.setError(err.message));
  }
};

// Create new product
export const createProduct =
  ({ title, description, imageUrl, price }) =>
  async (dispatch, getState) => {
    dispatch(productActions.startLoading());
    let pushToken;
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      pushToken = null;
    }

    if (finalStatus === 'granted') {
      pushToken = (await Notifications.getExpoPushTokenAsync()).data;
    }

    const token = getState().user.user && getState().user.user.idToken;

    try {
      const product = await fetchAPI.createData(
        'products',
        {
          title,
          description,
          imageUrl,
          price,
          rate: 3.5,
          reviews: [],
          pushToken,
        },
        token
      );

      dispatch(productActions.productCreated(product));
    } catch (err) {
      dispatch(productActions.setError(err.message));
    }
  };
// Updating product
export const updateProduct =
  ({ title, description, imageUrl, id, price }) =>
  async (dispatch, getState) => {
    dispatch(productActions.startLoading());
    const token = getState().user.user && getState().user.user.idToken;
    try {
      const isSuccessed = await fetchAPI.updateData(
        'products',
        { title, description, imageUrl, price },
        token,
        id
      );
      if (isSuccessed) {
        dispatch(productActions.productUpdated({ title, description, imageUrl, id, price }));
      }
    } catch (err) {
      dispatch(productActions.setError(err.message));
    }
  };

// Deleting product
export const deleteProduct = (productId) => async (dispatch, getState) => {
  dispatch(productActions.startLoading());
  const token = getState().user.user && getState().user.user.idToken;
  try {
    const isSuccessed = await fetchAPI.deleteData('products', productId, token);
    if (isSuccessed) {
      dispatch(productActions.productDeleted(productId));
    }
  } catch (err) {
    dispatch(productActions.setError(err.message));
  }
};

export default productsSlice.reducer;
