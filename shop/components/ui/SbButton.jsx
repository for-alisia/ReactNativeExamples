// @ts-nocheck
// Dependencies
import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';

// Components
import SbText from './SbText';

const SbButton = ({ onPress, children }) => {
  let TouchableComponent = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

  return (
    <TouchableComponent onPress={onPress} activeOpacity={0.75}>
      <View style={styles.container}>
        <SbText>{children}</SbText>
      </View>
    </TouchableComponent>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default SbButton;
