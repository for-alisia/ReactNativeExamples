import React from 'react';
import { View, StyleSheet } from 'react-native';

// Components
import SbTouchable from './SbTouchable';

// Theme
import theme from '../../theme';

const SbIconContainer = ({ children, width, height, onPress }) => {
  return (
    <View style={{ borderRadius: width / 2, width, height }}>
      <SbTouchable onPress={onPress} style={styles.touchable} round>
        <View style={{ ...styles.container, width, height }}>{children}</View>
      </SbTouchable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchable: {
    borderRadius: 100,
    overflow: 'hidden',
  },
});

export default SbIconContainer;
