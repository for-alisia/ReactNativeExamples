import React, { useEffect } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

// Hooks
import useInput from '../../hooks/useInput';

// Components
import SbText from './SbText';

// Theme
import theme from '../../theme';

const SbInput = ({
  errorText,
  label,
  hasError,
  value,
  onChangeHandler,
  onBlurHandler,
  ...props
}) => {
  return (
    <View style={styles.formControl}>
      <SbText style={styles.label}>{label}:</SbText>
      <TextInput
        {...props}
        style={{
          ...styles.input,
          borderColor: hasError ? theme.colors.accent : theme.colors.secondary,
          height: props.multiline ? +props.numberOfLines * 10 : 40,
        }}
        value={value}
        onChangeText={onChangeHandler}
        onBlur={onBlurHandler}
        returnKeyType="next"
      />
      {hasError && <SbText style={styles.errorText}>{errorText}</SbText>}
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: '100%',
    marginVertical: theme.margin.m,
  },
  label: {
    fontFamily: theme.fonts.playfair,
    color: theme.colors.grey,
  },
  input: {
    paddingHorizontal: theme.padding.xs,
    borderBottomWidth: 1,
    color: theme.colors.dark,
    height: 40,
  },
  errorText: {
    color: theme.colors.accent,
    fontSize: theme.fontSize.xs,
  },
});

export default SbInput;
