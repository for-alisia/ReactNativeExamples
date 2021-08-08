// Dependencies
import React from 'react';
import { StyleSheet, Text } from 'react-native';

// Theme
import theme from '../../theme';

const SbText = (props) => {
  const { style, children, bold } = props;

  return (
    <Text
      style={{
        ...styles.text,
        fontFamily: bold ? theme.fonts.monserratBold : theme.fonts.montserratReg,
        ...style,
      }}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: theme.fontSize.s,
    color: theme.colors.dark,
  },
});

export default SbText;
