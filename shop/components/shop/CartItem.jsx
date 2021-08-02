import React from 'react';
import { View, StyleSheet } from 'react-native';

// Components
import { SbText, SbTitle, SbCard, SbImage } from '../ui';

// Theme
import theme from '../../theme';

const CartItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <SbCard>
        <SbTitle>{item.productTitle}</SbTitle>
      </SbCard>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default CartItem;
