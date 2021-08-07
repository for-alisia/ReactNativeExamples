import React from 'react';
import { View, StyleSheet } from 'react-native';

// Components
import { SbText } from '../ui';

// Theme
import theme from '../../theme';

const TableItem = ({ item, idx }) => {
  return (
    <View style={styles.container}>
      <SbText>{idx + 1}</SbText>
      <SbText>{item.productTitle}</SbText>
      <SbText>{item.productPrice}</SbText>
      <SbText>{item.quantity}</SbText>
      <SbText>{item.sum}</SbText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: theme.colors.secondary,
  },
});

export default TableItem;
