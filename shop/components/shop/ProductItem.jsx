// Dependencies
import React from 'react';
import { StyleSheet, View } from 'react-native';

// Components
import { SbText } from '../ui';

const ProductItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <SbText>{item.title}</SbText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ProductItem;
