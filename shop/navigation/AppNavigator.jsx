// @ts-nocheck
import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

// Navigators
import { ShopNavigator } from './ShopNavigator';
import { AuthNavigator } from './StackNavigators';

// Screens
import StartupScreen from '../screens/StartupScreen';

const AppNavigator = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const didTryAutoLogin = useSelector((state) => state.user.didTryAutologin);

  return (
    <NavigationContainer>
      {isLoggedIn && <ShopNavigator />}
      {!isLoggedIn && didTryAutoLogin && <AuthNavigator />}
      {!isLoggedIn && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
