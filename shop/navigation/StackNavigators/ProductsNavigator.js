// Navigation
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Default options
import { defaultStackOptions } from '../options';

// Screens and screen options
import {
  ProductsOverviewScreen,
  productsOverviewScreenOptions,
  ProductDetailScreen,
  productDetailScreenOptions,
  CartScreen,
} from '../../screens/shop';

// Products Navigator (all products, product details and cart)
const ProductsStackNavigator = createStackNavigator();

const ProductsNavigator = () => {
  return (
    <ProductsStackNavigator.Navigator screenOptions={defaultStackOptions}>
      <ProductsStackNavigator.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={productsOverviewScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={productDetailScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name="Cart"
        component={CartScreen}
        options={{ title: 'Корзина' }}
      />
    </ProductsStackNavigator.Navigator>
  );
};

export default ProductsNavigator;
