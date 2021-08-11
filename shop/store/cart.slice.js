import { createSlice } from '@reduxjs/toolkit';

// Actions from other slices
import { productActions } from './products.slice';

const initialState = {
  items: {},
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const { price, title, imageUrl, id } = payload;

      if (state.items[id]) {
        state.items[id].quantity++;
        state.items[id].sum += price;
      } else {
        const newItemInCart = {
          price,
          title,
          imageUrl,
          quantity: 1,
          sum: price,
        };
        state.items[id] = newItemInCart;
      }
      state.total += price;
    },
    deleteFromCart: (state, { payload }) => {
      const id = payload;
      deleteItem(id, state);
    },
    substractFromCart: (state, { payload }) => {
      const id = payload;
      const currentQty = state.items[id].quantity;
      if (currentQty === 1) {
        deleteItem(id, state);
      } else {
        state.items[id].quantity--;
        state.items[id].sum -= state.items[id].price;
        state.total -= state.items[id].price;
      }
    },
    increaseInCart: (state, { payload }) => {
      const id = payload;
      state.items[id].quantity++;
      state.items[id].sum += state.items[id].price;
      state.total += state.items[id].price;
    },
    clearCart: (state) => {
      state.items = {};
      state.total = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(productActions.deleteProduct, (state, { payload }) => {
      const id = payload;
      if (state.items[id]) {
        deleteItem(id, state);
      }
    });
  },
});

function deleteItem(id, state) {
  const sumToDelete = state.items[id].sum;
  delete state.items[id];
  state.total -= sumToDelete;
}

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
