import theme from '../theme';
import { Platform } from 'react-native';

// Default Options for Stack Navigators (Header Styles)
export const defaultStackOptions = {
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
