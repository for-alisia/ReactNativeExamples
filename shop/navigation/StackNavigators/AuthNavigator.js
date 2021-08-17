// Dependencies
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Default options
import { defaultStackOptions } from '../options';

// Screens
import { AuthScreen } from '../../screens/user';

// Auth Navigator - Login Screen
const AuthStackNavigator = createStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultStackOptions}>
      <AuthStackNavigator.Screen
        name="Auth"
        component={AuthScreen}
        options={{ title: 'Авторизация' }}
      />
    </AuthStackNavigator.Navigator>
  );
};

export default AuthNavigator;
