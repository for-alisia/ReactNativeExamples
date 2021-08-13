import { createSlice } from '@reduxjs/toolkit';
import { ordersAPI } from '../fetchAPI';

const initialState = {
  orders: [],
  isLoading: false,
  error: null,
  isSuccessed: false,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    startLoading: (state) => {
      console.log('Is Loading was set');
      state.isLoading = true;
      state.error = null;
      state.isSuccessed = false;
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
      state.isSuccessed = false;
    },
    setOrders: (state, { payload }) => {
      state.orders = payload;
      state.isLoading = false;
      state.error = null;
      state.isSuccessed = false;
    },
    orderAdded: (state, { payload }) => {
      // @ts-ignore
      state.orders.push(payload);
      state.isLoading = false;
      state.error = null;
      state.isSuccessed = true;
    },
  },
});

export const orderActions = orderSlice.actions;

export const addOrder = ({ items, total }) => {
  return async (dispatch) => {
    dispatch(orderActions.startLoading());
    try {
      const orderToCreate = { items, total, status: 'Оформлен', date: +new Date() };
      const newOrder = await ordersAPI.addOrder(orderToCreate);
      dispatch(orderActions.orderAdded(newOrder));
    } catch (err) {
      dispatch(orderActions.setError(err.message));
    }
  };
};

export const getOrders = () => async (dispatch) => {
  dispatch(orderActions.startLoading());
  try {
    const ordersFromServer = await ordersAPI.getOrders();
    dispatch(orderActions.setOrders(ordersFromServer));
  } catch (err) {
    dispatch(orderActions.setError(err.message));
  }
};

export default orderSlice.reducer;
