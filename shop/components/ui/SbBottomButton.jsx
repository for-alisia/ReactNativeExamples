// @ts-nocheck
import React from 'react';
import { View, StyleSheet } from 'react-native';

// Components
import SbTouchable from './SbTouchable';

// Theme
import theme from '../../theme';

const SbBottomButton = (props) => {
  const { onPress, style, children } = props;

  return (
    <SbTouchable onPress={onPress}>
      <View style={{ ...styles.container, ...style }}>{children}</View>
    </SbTouchable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: theme.colors.primary,
    color: theme.colors.light,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.padding.m,
    borderTopRightRadius: theme.borderRadius.m,
    borderTopLeftRadius: theme.borderRadius.m,
  },
});

export default SbBottomButton;
