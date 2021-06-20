import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Theme
import colors from '../constants/colors';

const Header = ({ title }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 80,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 24,
  },
  headerTitle: {
    color: colors.light,
    fontSize: 24,
  },
});

export default Header;
