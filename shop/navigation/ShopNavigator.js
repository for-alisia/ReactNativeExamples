import React from 'react';
// Navigation
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
// import { createBottomTabNavigator } from 'react-navigation-tabs';
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';

import { Ionicons } from '@expo/vector-icons';

// Dependencies
import { Platform, View } from 'react-native';

// Screens
import {
  ProductsOverviewScreen,
  ProductDetailScreen,
  CartScreen,
  OrdersScreen,
} from '../screens/shop';
import { AdminProductsScreen, EditProductScreen } from '../screens/admin';
import { AuthScreen } from '../screens/user';

// Theme
import theme from '../theme';

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

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => {
        return (
          <View style={{ marginTop: 40 }}>
            <Ionicons
              name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
              size={24}
              color={drawerConfig.tintColor}
            />
          </View>
        );
      },
    },
    defaultNavigationOptions: defaultStackOptions,
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => {
        return (
          <Ionicons
            name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
            size={24}
            color={drawerConfig.tintColor}
          />
        );
      },
    },
    defaultNavigationOptions: defaultStackOptions,
  }
);

const AdminNavigator = createStackNavigator(
  {
    Admin: AdminProductsScreen,
    EditProduct: EditProductScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => {
        return (
          <Ionicons
            name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
            size={24}
            color={drawerConfig.tintColor}
          />
        );
      },
    },
    defaultNavigationOptions: defaultStackOptions,
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator,
  },
  {
    contentOptions: {
      activeTintColor: theme.colors.primary,
      labelStyle: {
        marginTop: 40,
        fontSize: 20,
      },
    },
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
  },
  {
    defaultNavigationOptions: defaultStackOptions,
  }
);

const MainNavigator = createSwitchNavigator({
  Auth: AuthNavigator,
  Shop: ShopNavigator,
});

export default createAppContainer(MainNavigator);
