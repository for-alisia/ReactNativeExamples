// Dependencies
import React from 'react';
import { StyleSheet, Text } from 'react-native';

// Theme
import theme from '../../theme';

const SbText = (props) => {
  const { style, children } = props;

  return <Text style={{ ...styles.text, ...style }}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: theme.fonts.montserratReg,
    fontSize: theme.fontSize.s,
    color: theme.colors.dark,
  },
});

export default SbText;
