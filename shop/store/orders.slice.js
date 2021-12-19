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
  return async (dispatch, getState) => {
    dispatch(orderActions.startLoading());
    const userId = getState().user.user && getState().user.user.localId;
    const orderToCreate = { items, total, status: 'Оформлен', date: +new Date(), userId };
    try {
      const newOrder = await ordersAPI.addOrder(orderToCreate);
      dispatch(orderActions.orderAdded(newOrder));
    } catch (err) {
      dispatch(orderActions.setError(err.message));
    }
    orderToCreate.items.forEach((product) => {
      fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: product.pushToken,
          data: { extraData: 'some data here' },
          title: 'You got an order',
          body: `You've just got a new order of ${product.title} (price: ${product.price}, amount: ${product.quantity})`,
        }),
      });
    });
  };
};

export const getOrders = () => async (dispatch, getState) => {
  dispatch(orderActions.startLoading());

  const userId = getState().user.user && getState().user.user.localId;
  const token = getState().user.user && getState().user.user.idToken;
  try {
    const ordersFromServer = await ordersAPI.getOrders(userId, token);
    dispatch(orderActions.setOrders(ordersFromServer));
  } catch (err) {
    dispatch(orderActions.setError(err.message));
  }
};

export default orderSlice.reducer;
