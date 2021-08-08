import React from 'react';
import { View, StyleSheet } from 'react-native';

// Components
import { SbText, SbImage } from '../ui';

// Theme
import theme from '../../theme';

const TableItem = ({ item, idx }) => {
  return (
    <View style={{ ...styles.container, borderTopWidth: idx === 0 ? 1 : 0 }}>
      <View style={styles.imageContainer}>
        <SbImage source={item.image} style={styles.image} />
      </View>
      <View style={styles.colLarge}>
        <SbText>{item.productTitle}</SbText>
      </View>
      <View>
        <SbText>{item.productPrice}&#x20bd;</SbText>
      </View>
      <View>
        <SbText>{item.quantity}шт.</SbText>
      </View>
      <View>
        <SbText bold>{item.sum}&#x20bd;</SbText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: theme.colors.secondary,
    paddingVertical: theme.padding.s,
  },
  colLarge: {
    width: '45%',
  },
  imageContainer: {
    width: 50,
  },
  image: {
    height: 70,
  },
});

export default TableItem;
