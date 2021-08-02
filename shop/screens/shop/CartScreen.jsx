import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

// Components
import { SbText, SbButton, SbTitle, SbLink, SbHeading, SbBottomButton } from '../../components/ui';

// Theme
import theme from '../../theme';

const CartScreen = ({ navigation }) => {
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
      {cartTotal > 0 ? (
        <View style={styles.detailsContainer}>
          <View style={styles.innerContainer}>
            <SbHeading>Детали заказа</SbHeading>
            <View style={styles.summary}>
              <SbText style={styles.amountText}>
                Всего позиций в заказе: <SbTitle>{cartAmount}</SbTitle>
              </SbText>
              <SbText style={styles.totalText}>
                На сумму: <SbTitle>{cartTotal.toFixed(2)} руб.</SbTitle>
              </SbText>
            </View>
            <View>
              <SbText>List of items here</SbText>
            </View>
          </View>
          <SbBottomButton
            onPress={() => console.log('Order')}
            disabled={cartTotal > 0 ? false : true}
          >
            <SbTitle style={styles.confirmOredertext}>Оформить заказ</SbTitle>
          </SbBottomButton>
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <SbText style={styles.emptyCartText}>Ваша корзина пока пуста</SbText>
          <SbLink
            onPress={() => {
              navigation.navigate('ProductsOverview');
            }}
          >
            Начните покупки!
          </SbLink>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detailsContainer: {
    flex: 1,
  },
  innerContainer: {
    padding: theme.padding.s,
  },
  confirmOredertext: {
    color: theme.colors.light,
    textTransform: 'uppercase',
    fontFamily: theme.fonts.montserratReg,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -64,
  },
  summary: {
    marginBottom: theme.margin.s,
  },
  amountText: {
    marginBottom: theme.margin.s,
  },
  totalText: {
    marginBottom: theme.margin.m,
  },
  emptyCartText: {
    textAlign: 'center',
    marginBottom: theme.margin.m,
  },
});

CartScreen.navigationOptions = (navData) => ({
  headerTitle: 'Корзина',
});

export default CartScreen;
