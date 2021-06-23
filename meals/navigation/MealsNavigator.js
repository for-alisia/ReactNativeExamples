import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Platform } from 'react-native';
// import { createBottomTabNavigator } from 'react-navigation-tabs';
// import { createDrawerNavigator } from 'react-navigation-drawer';

// Theme
import theme from '../theme';

// Screens
import { CategoriesScreen, CategoryMealsScreen, MealDetailScreen } from '../screens';

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
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? theme.colors.primary : 'white',
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : theme.colors.primary,
    },
  }
);

export default createAppContainer(MealsNavigator);
