// Dependencies
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Default options
import { defaultStackOptions } from '../options';

// Screens and options
import {
  AdminProductsScreen,
  adminProductsScreenOptions,
  EditProductScreen,
  editProductScreenOptions,
} from '../../screens/admin';

// Admin Navigator - edit, create and delete all products
const AdminStackNavigator = createStackNavigator();

const AdminNavigator = () => {
  return (
    <AdminStackNavigator.Navigator screenOptions={defaultStackOptions}>
      <AdminStackNavigator.Screen
        name="Admin"
        component={AdminProductsScreen}
        options={adminProductsScreenOptions}
      />
      <AdminStackNavigator.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={editProductScreenOptions}
      />
    </AdminStackNavigator.Navigator>
  );
};

export default AdminNavigator;
