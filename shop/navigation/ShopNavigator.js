// Navigation
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
// import { createBottomTabNavigator } from 'react-navigation-tabs';
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
// import { createDrawerNavigator } from 'react-navigation-drawer';

// Dependencies
import { Platform } from 'react-native';

// Screens
import { ProductsOverviewScreen } from '../screens/shop';

// Theme
import theme from '../theme';

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? theme.colors.primary : theme.colors.light,
      },
      headerTintColor: Platform.OS === 'android' ? theme.colors.light : theme.colors.primary,
    },
  }
);

export default createAppContainer(ProductsNavigator);
