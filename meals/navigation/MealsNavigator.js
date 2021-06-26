// Dependencies
import React from 'react';
import { Platform } from 'react-native';

// Navigation
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
// import { createDrawerNavigator } from 'react-navigation-drawer';

// Icons
import { Ionicons } from '@expo/vector-icons';

// Theme
import theme from '../theme';

// Screens
import { CategoriesScreen, CategoryMealsScreen, MealDetailScreen, FavouritesScreen } from '../screens';

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? theme.colors.primary : 'white',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : theme.colors.primary,
}


// Main Navigation (back - forward) in the header
const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen,
      navigationOptions: {
        headerTitle: 'Meal Categories',
      },
    },
    CategoryMeals: {
      screen: CategoryMealsScreen,
    },
    MealDetail: MealDetailScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const FavNavigator = createStackNavigator({
  Favourites: FavouritesScreen,
  MealDetail: MealDetailScreen
}, {
  defaultNavigationOptions: defaultStackNavOptions,
})

const tabsScreenConfig = {
  Meals: {
    screen: MealsNavigator, 
    navigationOptions: {
      tabBarLabel: 'All meals',
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-restaurant" size={24} color={tabInfo.tintColor}/>
      },
      tabBarColor: theme.colors.primary
    },
  }, 
  Favourites: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarLabel: 'My meals',
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-heart" size={24} color={tabInfo.tintColor}/>
      },
      tabBarColor: theme.colors.accentColor
    }
  }
}

// Tab Navigation
const mealsFavTabNavigator = Platform.OS === 'android' ? createMaterialBottomTabNavigator(
  tabsScreenConfig, {
    activeColor: 'white',
    shifting: true,
    // without shifting to change background
    barStyle: {
      backgroundColor: theme.colors.primary
    }
  }
) : createBottomTabNavigator(
  tabsScreenConfig, 
  {
  tabBarOptions: {
    activeTintColor: theme.colors.accentColor
  }
});

export default createAppContainer(mealsFavTabNavigator);
