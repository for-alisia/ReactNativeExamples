// @ts-nocheck
// Dependencies
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Default options
import { defaultStackOptions } from '../options';

// Screens and screens options
import {
  BranchesScreen,
  branchesScreenOptions,
  BranchDetailScreen,
  branchDetailScreenOptions,
  BranchCreateScreen,
  branchCreateScreenOptions,
  BranchMapScreen,
  branchMapScreenOptions,
} from '../../screens/studios';

const BranchesStackNavigator = createStackNavigator();

const BranchesNavigator = () => {
  return (
    <BranchesStackNavigator.Navigator screenOptions={defaultStackOptions}>
      <BranchesStackNavigator.Screen
        name="Branches"
        component={BranchesScreen}
        options={branchesScreenOptions}
      />
      <BranchesStackNavigator.Screen
        name="BranchDetail"
        component={BranchDetailScreen}
        options={branchDetailScreenOptions}
      />
      <BranchesStackNavigator.Screen
        name="BranchCreate"
        component={BranchCreateScreen}
        options={branchCreateScreenOptions}
      />
      <BranchesStackNavigator.Screen
        name="BranchMap"
        component={BranchMapScreen}
        options={branchMapScreenOptions}
      />
    </BranchesStackNavigator.Navigator>
  );
};

export default BranchesNavigator;
