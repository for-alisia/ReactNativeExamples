// @ts-nocheck
// Dependencies
import React, { useState } from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { enableScreens } from 'react-native-screens';
import * as Notifications from 'expo-notifications';

// Redux
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import productsReducer from './store/products.slice';
import cartReducer from './store/cart.slice';
import ordersReducer from './store/orders.slice';
import userReducer from './store/auth.slice';
import branchesReducer from './store/branches.slice';

// Navigation
import AppNavigator from './navigation/AppNavigator';

// Local DB
import { init } from './helpers/db';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
    };
  },
});

enableScreens();

init()
  .then(() => {
    console.log('Initialized db');
  })
  .catch((err) => {
    console.log(err);
  });

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer,
    user: userReducer,
    branches: branchesReducer,
  },
});

const fetchFonts = () => {
  return Font.loadAsync({
    // @ts-ignore
    'montserrat-regular': require('./assets/fonts/Montserrat-Regular.ttf'),
    // @ts-ignore
    'montserrat-bold': require('./assets/fonts/Montserrat-Bold.ttf'),
    // @ts-ignore
    playfair: require('./assets/fonts/PlayfairDisplay-Regular.ttf'),
    // @ts-ignore
    'playfair-bold': require('./assets/fonts/PlayfairDisplay-Bold.ttf'),
  });
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
