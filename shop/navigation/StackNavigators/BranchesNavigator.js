// Dependencies
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Default options
import { defaultStackOptions } from '../options';

// Screens and screens options
import { BranchesScreen, branchesScreenOptions } from '../../screens/studios';

const BranchesStackNavigator = createStackNavigator();

const BranchesNavigator = () => {
  return (
    <BranchesStackNavigator.Navigator screenOptions={defaultStackOptions}>
      <BranchesStackNavigator.Screen
        name="Branches"
        component={BranchesScreen}
        options={branchesScreenOptions}
      />
    </BranchesStackNavigator.Navigator>
  );
};

export default BranchesNavigator;
