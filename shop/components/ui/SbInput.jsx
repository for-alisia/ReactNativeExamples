import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

// Components
import SbText from './SbText';

// Theme
import theme from '../../theme';

const SbInput = ({ value, isValid, errorText, onChangeText }) => {
  return (
    <View style={styles.formControl}>
      <SbText style={styles.label}>Наименование:</SbText>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        returnKeyType="next"
      />
      {!isValid && <SbText>{errorText}</SbText>}
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: '100%',
    marginVertical: theme.margin.m,
  },
  label: {},
  input: {
    paddingHorizontal: theme.padding.xs,
    borderBottomWidth: 1,
    borderColor: theme.colors.secondary,
    height: 40,
  },
});

export default SbInput;
