// @ts-nocheck
import React from 'react';
import { TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';

// Theme
import theme from '../../theme';

const SbTouchable = (props) => {
  const { activeOpacity, onPress, children } = props;
  const TComponent = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;
  return (
    <TComponent activeOpacity={activeOpacity || theme.activeOpacity} onPress={onPress}>
      {children}
    </TComponent>
  );
};

export default SbTouchable;
