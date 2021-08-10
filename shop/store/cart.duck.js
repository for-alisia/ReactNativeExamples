import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: {},
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const newItemInCart = {
        price: payload.price,
        title: payload.title,
        imageUrl: payload.imageUrl,
        quantity: 1,
        sum: payload.price,
      };
      state.items[payload.id] = newItemInCart;
      state.total += payload.price;
    },
    deleteFromCart: (state, { payload }) => {
      const sumToDelete = state.items[payload].sum;
      delete state.items[payload];
      state.total -= sumToDelete;
    },
    substractFromCart: (state, { payload }) => {
      const currentQty = state.items[payload].quantity;
      if (currentQty === 1) {
        const sumToDelete = state.items[payload].sum;
        delete state.items[payload];
        state.total -= sumToDelete;
      } else {
        state.items[payload].quantity--;
        state.items[payload].sum -= state.items[payload].price;
        state.total -= state.items[payload].price;
      }
    },
    increaseInCart: (state, { payload }) => {
      state.items[payload].quantity++;
      state.items[payload].sum += state.items[payload].price;
      state.total += state.items[payload].price;
    },
    clearCart: (state) => {
      console.log('To clear cart');
      state.items = {};
      state.total = 0;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
