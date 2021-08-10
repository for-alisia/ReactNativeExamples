import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, { payload }) => {
      const newOrder = {
        id: new Date().toString(),
        items: payload.items,
        total: payload.total,
        date: +new Date(),
        status: 'Оформлен',
      };
      // @ts-ignore
      state.orders.push(newOrder);
    },
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice.reducer;
