import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Platform } from 'react-native';

// Icons
import { Ionicons } from '@expo/vector-icons';

// Theme
import theme from '../../theme';

const SbHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={24}
      color={Platform.OS === 'android' ? theme.colors.light : theme.colors.primary}
    />
  );
};

export default SbHeaderButton;
