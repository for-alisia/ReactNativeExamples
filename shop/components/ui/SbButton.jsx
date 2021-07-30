// @ts-nocheck
// Dependencies
import React from 'react';
import { StyleSheet, View } from 'react-native';

// Components
import SbText from './SbText';
import SbTouchable from './SbTouchable';

// Theme
import theme from '../../theme';

const SbButton = (props) => {
  const { children, onPress, type, style } = props;

  const typeStyles = type || 'solid';
  const textStyles = typeStyles === 'solid' ? 'textSolid' : 'textOutlined';

  return (
    <SbTouchable onPress={onPress}>
      <View style={{ ...styles.container, ...styles[typeStyles], ...style }}>
        <SbText style={{ ...styles.text, ...styles[textStyles] }}>{children}</SbText>
      </View>
    </SbTouchable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.padding.s,
    paddingHorizontal: theme.padding.m,
    borderRadius: theme.borderRadius.l,
  },
  solid: {
    backgroundColor: theme.colors.primary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: theme.colors.primary,
    borderWidth: 1,
  },
  text: {
    textTransform: 'uppercase',
    fontSize: theme.fontSize.s,
    textAlign: 'center',
  },
  textSolid: {
    color: theme.colors.light,
  },
  textOutlined: {
    color: theme.colors.primary,
  },
});

export default SbButton;
