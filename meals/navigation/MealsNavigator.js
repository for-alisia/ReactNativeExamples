// Dependencies
import React from 'react';
import { Platform, Text } from 'react-native';


// Navigation
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';

// Icons
import { Ionicons } from '@expo/vector-icons';

// Theme
import theme from '../theme';

// Screens
import { CategoriesScreen, CategoryMealsScreen, MealDetailScreen, FavouritesScreen, FiltersScreen } from '../screens';

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? theme.colors.primary : 'white',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : theme.colors.primary,
  headerTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  }
}


// Main Navigation (back - forward) in the header
const MealsNavigator = createStackNavigator(
  {
    Categories: CategoriesScreen,
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
      tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans'}}>All Meals</Text> : 'All Meals',
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-restaurant" size={24} color={tabInfo.tintColor}/>
      },
      tabBarColor: theme.colors.primary
    },
  }, 
  Favourites: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarLabel: Platform.OS === 'ios' ? 'My meals' : <Text style={{fontFamily: 'open-sans'}}>My Meals</Text>,
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-heart" size={24} color={tabInfo.tintColor}/>
      },
      tabBarColor: theme.colors.accentColor,
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
    labelStyle: {
      fontFamily: 'open-sans'
    },
    activeTintColor: theme.colors.accentColor
  }
});

const FiltersNavStack = createStackNavigator({
  Filters: FiltersScreen
},
  {
    defaultNavigationOptions: defaultStackNavOptions,
    // navigationOptions: {
    //   drawerLabel: 'Filters!!!'
    // }
  }
)

const mainNavigator = createDrawerNavigator({
  MealsFavs: {
    screen: mealsFavTabNavigator,
    navigationOptions: {
      drawerLabel: 'Meals'
    }
  },
  Filters: FiltersNavStack
}, {
  contentOptions: {
    activeTintColor: theme.colors.accentColor,
    labelStyle: {
      marginTop: 48,
      fontSize: 24,
      fontFamily: 'open-sans'
    },
  }
});

export default createAppContainer(mainNavigator);
