import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

// theme
import theme from '../../theme';

const SbLoading = (props) => {
  return (
    <View style={{ ...styles.container, ...props.style }}>
      <ActivityIndicator size="large" color={props.color || theme.colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SbLoading;
