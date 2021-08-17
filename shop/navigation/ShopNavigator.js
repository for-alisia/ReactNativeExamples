import React from 'react';
// Navigation
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerContentScrollView,
} from '@react-navigation/drawer';

// Icons
import { Ionicons } from '@expo/vector-icons';

// Dependencies
import { Platform, View, SafeAreaView } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../store/auth.slice';

// Components
import { SbButton } from '../components/ui';

// Screens
import {
  ProductsOverviewScreen,
  ProductDetailScreen,
  CartScreen,
  OrdersScreen,
} from '../screens/shop';
import { AdminProductsScreen, EditProductScreen } from '../screens/admin';
import { AuthScreen } from '../screens/user';
import StartupScreen from '../screens/StartupScreen';

// Options
import { screenOptions } from '../screens/shop/ProductsOverviewScreen';
import { screenOptions as productDetailsScreenOptions } from '../screens/shop/ProductDetailScreen';
import { screenOptions as ordersScreenOptions } from '../screens/shop/OrdersScreen';
import { screenOptions as adminScreenOptions } from '../screens/admin/AdminProductsScreen';
import { screenOptions as editScreenOptions } from '../screens/admin/EditProductScreen';

// Theme
import theme from '../theme';

// Default Options for Stack Navigators (Header Styles)
const defaultStackOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? theme.colors.primary : theme.colors.light,
  },
  headerTitleStyle: {
    fontFamily: theme.fonts.montserratReg,
    fontSize: theme.fontSize.s,
  },
  headerBackTitleStyle: {
    fontFamily: theme.fonts.montserratReg,
    fontSize: theme.fontSize.s,
  },
  headerTintColor: Platform.OS === 'android' ? theme.colors.light : theme.colors.primary,
};

// Products Navigator (all products, product details and cart)
const ProductsStackNavigator = createStackNavigator();

export const ProductsNavigator = () => {
  return (
    <ProductsStackNavigator.Navigator screenOptions={defaultStackOptions}>
      <ProductsStackNavigator.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={screenOptions}
      />
      <ProductsStackNavigator.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={productDetailsScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name="Cart"
        component={CartScreen}
        options={{ title: 'Корзина' }}
      />
    </ProductsStackNavigator.Navigator>
  );
};

// Orders Navigator - orders, created by user
const OrdersStackNavigator = createStackNavigator();

export const OrdersNavigator = () => {
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

// Admin Navigator - edit, create and delete all products
const AdminStackNavigator = createStackNavigator();

export const AdminNavigator = () => {
  return (
    <AdminStackNavigator.Navigator screenOptions={defaultStackOptions}>
      <AdminStackNavigator.Screen
        name="Admin"
        component={AdminProductsScreen}
        options={adminScreenOptions}
      />
      <AdminStackNavigator.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={editScreenOptions}
      />
    </AdminStackNavigator.Navigator>
  );
};

// Drawer Navigator for navigation through all app
const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
  const dispatch = useDispatch();

  return (
    <ShopDrawerNavigator.Navigator
      screenOptions={{
        drawerActiveTintColor: theme.colors.primary,
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
        name="Orders"
        component={OrdersNavigator}
        options={{
          title: 'Заказы',
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
        name="Admin"
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

// Auth Navigator - Login Screen
const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
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

// const AuthNavigator = createStackNavigator(
//   {
//     Auth: AuthScreen,
//   },
//   {
//     defaultNavigationOptions: defaultStackOptions,
//   }
// );

// const MainNavigator = createSwitchNavigator({
//   Startup: StartupScreen,
//   Auth: AuthNavigator,
//   Shop: ShopNavigator,
// });

// export default createAppContainer(MainNavigator);
