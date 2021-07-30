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
  const cartAmount = useSelector((state) => {
    // @ts-ignore
    return Object.keys(state.cart.items).length;
  });
  const cartItems = useSelector((state) => {
    const transformedItems = [];

    // @ts-ignore
    for (let key in state.cart.items) {
      transformedItems.push({
        id: key,
        // @ts-ignore
        ...state.cart.items[key],
      });
    }

    return transformedItems;
  });

  return (
    <View style={styles.container}>
      <View style={styles.summary}>
        <SbText style={styles.amountText}>
          Всего позиций в заказе: <SbTitle>{cartAmount}</SbTitle>
        </SbText>
        <SbText style={styles.totalText}>
          На сумму: <SbTitle>{cartTotal.toFixed(2)} руб.</SbTitle>
        </SbText>
        <SbButton onPress={() => console.log('Order')}>Оформить заказ</SbButton>
      </View>
      <View>
        <SbTitle>Детали заказа</SbTitle>
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
    marginBottom: theme.margin.s,
    padding: theme.padding.xs,
  },
  amountText: {
    marginBottom: theme.margin.s,
  },
  totalText: {
    marginBottom: theme.margin.m,
  },
});

CartScreen.navigationOptions = (navData) => ({
  headerTitle: 'Корзина',
});

export default CartScreen;
