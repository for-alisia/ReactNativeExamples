// @ts-nocheck
import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// Components
import { SbText, SbTitle, SbLink, SbHeading, SbBottomButton } from '../../components/ui';
import { CartItem } from '../../components/shop';

// Theme
import theme from '../../theme';

// Actions
import { cartActions, deleteFromCart } from '../../store/cart.slice';
import { addOrder } from '../../store/orders.slice';

// Utils
import { getTotalPositions } from '../../utils';

const CartScreen = ({ navigation }) => {
  // @ts-ignore
  const cartTotal = useSelector((state) => state.cart.total);
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
  const isLoadingOrder = useSelector((state) => state.orders.isLoading);
  const isAddingOrderSuccess = useSelector((state) => state.orders.isSuccessed);
  const error = useSelector((state) => state.orders.error);

  const dispatch = useDispatch();

  // Deleting item from cart
  const itemDeleteFromCartHandler = (id) => {
    dispatch(deleteFromCart(id));
  };
  // Adding item in the cart
  const itemAddInCartHandler = (id) => {
    dispatch(cartActions.increaseInCart(id));
  };
  // Substracting item in the cart
  const itemSubstractInCartHandler = (id) => {
    dispatch(cartActions.substractFromCart(id));
  };
  // Create new Order
  const addNewOrderHandler = () => {
    dispatch(addOrder({ items: cartItems, total: cartTotal }));
  };

  useEffect(() => {
    if (error) {
      Alert.alert('Произошла ошибка', 'При размещении заказа произошла ошибка', [{ text: 'OK' }]);
      return;
    }
    if (!error && isAddingOrderSuccess) {
      dispatch(cartActions.clearCart());
    }
  }, [error, isAddingOrderSuccess]);
  // Render item in a list
  const renderItem = (itemData) => {
    const { item } = itemData;

    const viewDetailHandler = () => {
      navigation.navigate('ProductDetail', { productId: item.id, productTitle: item.title });
    };

    return (
      <CartItem
        item={item}
        onViewDetail={viewDetailHandler}
        onDeleteItem={itemDeleteFromCartHandler.bind(null, item.id)}
        onAddItem={itemAddInCartHandler.bind(null, item.id)}
        onSubstractItem={itemSubstractInCartHandler.bind(null, item.id)}
      />
    );
  };

  return (
    <View style={styles.container}>
      {cartTotal > 0 ? (
        <View style={styles.detailsContainer}>
          <View style={styles.innerContainer}>
            <SbHeading>Детали заказа</SbHeading>
            <View style={styles.summary}>
              <View style={styles.summaryRow}>
                <View style={styles.colLarge}>
                  <SbText>Всего позиций в заказе:</SbText>
                </View>
                <View style={styles.colNarrow}>
                  <SbTitle>{getTotalPositions(cartItems)}</SbTitle>
                </View>
              </View>
              <View style={styles.summaryRow}>
                <View style={styles.colLarge}>
                  <SbText>На сумму:</SbText>
                </View>
                <View style={styles.colNarrow}>
                  <SbTitle>{cartTotal.toFixed(2)} руб.</SbTitle>
                </View>
              </View>
            </View>
            <View style={{ paddingBottom: 280 }}>
              <FlatList numColumns={1} data={cartItems} renderItem={renderItem} />
            </View>
          </View>
          <SbBottomButton onPress={addNewOrderHandler} disabled={cartTotal > 0 ? false : true}>
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
  summaryRow: {
    marginBottom: theme.margin.s,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colLarge: {
    width: '60%',
  },
  colNarrow: {
    width: '40%',
    paddingLeft: theme.padding.s,
  },
  emptyCartText: {
    textAlign: 'center',
    marginBottom: theme.margin.m,
  },
});

export default CartScreen;
