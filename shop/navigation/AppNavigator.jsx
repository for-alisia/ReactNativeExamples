// @ts-nocheck
import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { ShopNavigator, AuthNavigator } from './ShopNavigator';
import StartupScreen from '../screens/StartupScreen';

const AppNavigator = (props) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const didTryAutoLogin = useSelector((state) => state.user.didTryAutoLogin);

  return (
    <NavigationContainer>
      {isLoggedIn && <ShopNavigator />}
      {!isLoggedIn && didTryAutoLogin && <AuthNavigator />}
      {!isLoggedIn && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
