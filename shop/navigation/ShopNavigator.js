// Navigation
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
// import { createBottomTabNavigator } from 'react-navigation-tabs';
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
// import { createDrawerNavigator } from 'react-navigation-drawer';

// Dependencies
import { Platform } from 'react-native';

// Screens
import { ProductsOverviewScreen, ProductDetailScreen } from '../screens/shop';

// Theme
import theme from '../theme';

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
  },
  {
    defaultNavigationOptions: {
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
    },
  }
);

export default createAppContainer(ProductsNavigator);
