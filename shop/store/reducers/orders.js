import { ADD_ORDER } from '../actions/orders.actions';
import Order from '../../models/order';

const initialState = {
  orders: [],
};

const ordersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_ORDER:
      const newOrder = new Order(
        new Date().toString(),
        payload.items,
        payload.total,
        new Date(),
        'created'
      );

      return { ...state, orders: [...state.orders, newOrder] };
    default:
      return state;
  }
};

export default ordersReducer;
