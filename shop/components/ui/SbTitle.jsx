// Dependencies
import React from 'react';
import { StyleSheet, Text } from 'react-native';

// Theme
import theme from '../../theme';

const SbTitle = (props) => {
  const { style, children } = props;

  return <Text style={{ ...styles.title, ...style }}>{children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontFamily: theme.fonts.monserratBold,
    fontSize: theme.fontSize.s,
    color: theme.colors.primary,
  },
});

export default SbTitle;
