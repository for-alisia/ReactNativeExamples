import React from 'react';
// Navigation
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerContentScrollView,
} from '@react-navigation/drawer';

// Stack Navigators
import {
  ProductsNavigator,
  OrdersNavigator,
  AdminNavigator,
  BranchesNavigator,
} from './StackNavigators';

// Icons
import { Ionicons } from '@expo/vector-icons';

// Dependencies
import { Platform, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../store/auth.slice';

// Components
import { SbButton } from '../components/ui';

// Theme
import theme from '../theme';

// Drawer Navigator for navigation through all app
const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
  const dispatch = useDispatch();

  return (
    <ShopDrawerNavigator.Navigator
      screenOptions={{
        drawerActiveTintColor: theme.colors.primary,
        headerShown: false,
      }}
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, marginTop: 36 }}>
            <DrawerContentScrollView>
              <DrawerItemList {...props} />
              <SbButton
                onPress={() => {
                  dispatch(logout());
                  props.navigation.navigate('Auth');
                }}
              >
                Выйти
              </SbButton>
            </DrawerContentScrollView>
          </View>
        );
      }}
    >
      <ShopDrawerNavigator.Screen
        name="Products"
        component={ProductsNavigator}
        options={{
          title: 'Товары',
          drawerIcon: (props) => {
            return (
              <Ionicons
                name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                size={24}
                color={props.color}
              />
            );
          },
        }}
      />
      <ShopDrawerNavigator.Screen
        name="UserOrders"
        component={OrdersNavigator}
        options={{
          title: 'Ваши заказы',
          drawerIcon: (props) => {
            return (
              <Ionicons
                name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                size={24}
                color={props.color}
              />
            );
          },
        }}
      />
      <ShopDrawerNavigator.Screen
        name="AllBranches"
        component={BranchesNavigator}
        options={{
          title: 'Филиалы',
          drawerIcon: (props) => {
            return <Ionicons name="earth-sharp" size={24} color={props.color} />;
          },
        }}
      />
      <ShopDrawerNavigator.Screen
        name="AdminBar"
        component={AdminNavigator}
        options={{
          title: 'Администрирование',
          drawerIcon: (props) => {
            return (
              <Ionicons
                name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                size={24}
                color={props.color}
              />
            );
          },
        }}
      />
    </ShopDrawerNavigator.Navigator>
  );
};
