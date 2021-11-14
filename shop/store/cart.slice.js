import { createSlice } from '@reduxjs/toolkit';

// Actions from other slices
import { productActions } from './products.slice';

// DB functions
import { sqlUpdateInCart, sqlFetchCart, sqlDeleteFromCart } from '../helpers/db';

const initialState = {
  items: {},
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, { payload }) => {
      state.items = payload;

      state.total = Object.keys(payload).reduce((sum, key) => {
        return sum + payload[key].sum;
      }, 0);
    },
    addToCart: (state, { payload }) => {
      const { price, title, imageUrl, id, sqId } = payload;

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
          sqId,
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
    builder.addCase(productActions.productDeleted, (state, { payload }) => {
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

export const fetchCart = () => async (dispatch) => {
  try {
    const dbResult = await sqlFetchCart();
    console.log(dbResult);
    let convertedItems = {};
    dbResult.rows._array.forEach(({ productId, qty, title, price, imageUrl }) => {
      convertedItems[productId] = {
        title,
        price,
        quantity: qty,
        imageUrl,
        sum: qty * price,
      };
    });
    dispatch(cartActions.setCart(convertedItems));
  } catch (err) {
    console.log(err);
  }
};

export const addToCart =
  ({ price, title, imageUrl, id }) =>
  async (dispatch, getState) => {
    let qty = 1;
    const currentItems = getState().cart.items;
    if (currentItems[id]) {
      qty += currentItems[id].quantity;
    }
    try {
      const dbResult = await sqlUpdateInCart({ productId: id, title, imageUrl, qty, price });
      dispatch(cartActions.addToCart({ price, title, imageUrl, id, sqId: dbResult.insertId }));
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

export const deleteFromCart = (id) => async (dispatch, getState) => {
  try {
    await sqlDeleteFromCart(id);
    dispatch(cartActions.deleteFromCart(id));
  } catch (err) {
    throw err;
  }
};

export default cartSlice.reducer;
