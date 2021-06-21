import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Theme
import colors from '../constants/colors';

const MainButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  buttonText: {
    color: colors.light,
    fontFamily: 'open-sans',
    fontSize: 18,
  },
});

export default MainButton;
