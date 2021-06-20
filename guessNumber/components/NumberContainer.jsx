import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Theme
import colors from '../constants/colors';

const NumberContainer = ({ children, ...props }) => {
  return (
    <View {...props} style={styles.container}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 2,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.secondary,
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default NumberContainer;
