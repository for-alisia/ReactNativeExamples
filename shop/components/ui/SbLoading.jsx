import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

const SbLoading = (props) => {
  return (
    <View style={{ ...styles.container, ...props.style }}>
      <ActivityIndicator size="large" color={props.color} />
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
