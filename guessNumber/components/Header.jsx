import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

// Theme
import colors from '../constants/colors';

const Header = ({ title }) => {
  return (
    <View
      style={{
        ...styles.headerContainerBase,
        ...Platform.select({
          ios: styles.headerContainerIos,
          android: styles.headerContainerAndroid,
        }),
      }}
    >
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainerBase: {
    width: '100%',
    height: 80,
    justifyContent: 'center',
    paddingTop: 24,
    alignItems: 'center',
  },
  headerContainerAndroid: {
    backgroundColor: colors.primary,
  },
  headerContainerIos: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    backgroundColor: colors.light,
  },
  headerTitle: {
    color: Platform.OS === 'android' ? colors.light : colors.primary,
    fontSize: 24,
    fontFamily: 'open-sans-bold',
  },
});

export default Header;
