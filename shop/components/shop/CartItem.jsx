import React from 'react';
import { View, StyleSheet } from 'react-native';

// Components
import { SbText, SbTitle, SbCard } from '../ui';

// Theme
import theme from '../../theme';

const CartItem = () => {
  return (
    <View style={styles.container}>
      <SbCard>
        <SbTitle>Cart Item here</SbTitle>
      </SbCard>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default CartItem;
