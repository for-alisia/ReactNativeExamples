import React from 'react';
import { Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

import theme from '../../theme';

const CustomHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={18}
      color={Platform.OS === 'android' ? 'white' : theme.colors.primary}
    />
  );
};

export default CustomHeaderButton;
