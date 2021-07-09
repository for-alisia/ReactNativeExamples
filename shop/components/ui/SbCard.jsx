// Dependencies
import React from 'react';
import { StyleSheet, View } from 'react-native';

// Theme
import theme from '../../theme';

const SbCard = (props) => {
  const { style, children } = props;

  return <View style={{ ...styles.container, ...style }}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    shadowColor: 'black',
    shadowOpacity: 0.16,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    backgroundColor: theme.colors.white,
    flex: 1,
  },
});

export default SbCard;
