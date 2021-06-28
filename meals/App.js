// Dependencies
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { enableScreens } from 'react-native-screens';
import { createStore, combineReducers } from 'redux';
import { Provider} from 'react-redux';

// Navigation
import MealsNavigator from './navigation/MealsNavigator';

// Rreducers
import mealsReducer from './store/reducers/meals.reducer';

enableScreens();

const rootReducer = combineReducers({
  meals: mealsReducer
})

const store = createStore(rootReducer);

const fetchFonts = () => {
  return Font.loadAsync({
    // @ts-ignore
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    // @ts-ignore
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

export default function App() {
  // If fonts are loaded
  const [fontLoaded, setFontLoaded] = useState(false);

  // Render AppLoading while fonts are not loaded
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }
  return (
    <Provider store={store}>
      <MealsNavigator />
    </Provider>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
