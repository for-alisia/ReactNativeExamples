// Dependencies
import React, { useState } from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { enableScreens } from 'react-native-screens';

// Redux
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import productsReducer from './store/reducers/products.reducer';
import cartReducer from './store/reducers/cart.reducer';

// Redux-devtools
import { composeWithDevTools } from 'redux-devtools-extension';

// Navigation
import ShopNavigator from './navigation/ShopNavigator';
import ordersReducer from './store/reducers/orders';

enableScreens();

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

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
      <ShopNavigator />
    </Provider>
  );
}
