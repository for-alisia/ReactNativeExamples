import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Default options
import { defaultStackOptions } from '../options';

// Screens and options
import { OrdersScreen, ordersScreenOptions } from '../../screens/shop';

// Orders Navigator - orders, created by user
const OrdersStackNavigator = createStackNavigator();

const OrdersNavigator = () => {
  return (
    <OrdersStackNavigator.Navigator screenOptions={defaultStackOptions}>
      <OrdersStackNavigator.Screen
        name="Orders"
        component={OrdersScreen}
        options={ordersScreenOptions}
      />
    </OrdersStackNavigator.Navigator>
  );
};

export default OrdersNavigator;
