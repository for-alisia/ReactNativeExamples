import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

// Components
import { SbText, SbButton, SbTitle } from '../../components/ui';

// Theme
import theme from '../../theme';

const CartScreen = () => {
  // @ts-ignore
  const cartTotal = useSelector((state) => state.cart.total);

  return (
    <View style={styles.container}>
      <View style={styles.summary}>
        <SbTitle>К оплате: {cartTotal.toFixed(2)} руб.</SbTitle>
        <SbButton onPress={() => console.log('Order')}>Оформить заказ</SbButton>
      </View>
      <View>
        <SbText>List of items here</SbText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: theme.margin.s,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.margin.s,
    padding: theme.padding.xs,
  },
});

export default CartScreen;
