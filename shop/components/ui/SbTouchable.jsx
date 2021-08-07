// @ts-nocheck
import React from 'react';
import { TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';

// Theme
import theme from '../../theme';

const SbTouchable = (props) => {
  const { activeOpacity, onPress, children, style } = props;
  const TComponent =
    Platform.OS === 'android' && Platform.Version >= 21
      ? TouchableNativeFeedback
      : TouchableOpacity;
  return (
    <TComponent
      activeOpacity={activeOpacity || theme.activeOpacity}
      onPress={onPress}
      useForeground
      style={style}
      background={TouchableNativeFeedback.Ripple(theme.colors.greyLight, true)}
    >
      {children}
    </TComponent>
  );
};

export default SbTouchable;
