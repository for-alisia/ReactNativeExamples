import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

// Theme
import colors from '../constants/colors';

const Input = ({ inputStyles, ...props }) => {
  return <TextInput {...props} style={{ ...styles.input, ...inputStyles }} />;
};

const styles = StyleSheet.create({
  input: {
    height: 32,
    borderColor: colors.primary,
    borderWidth: 1,
    marginVertical: 16,
  },
});

export default Input;
