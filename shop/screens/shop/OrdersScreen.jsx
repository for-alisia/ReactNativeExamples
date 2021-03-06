// @ts-nocheck
import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// Components
import { SbHeaderButton, SbHeading, SbLoading, SbError, SbText } from '../../components/ui';
import { OrderItem } from '../../components/shop';

// Actions
import { getOrders } from '../../store/orders.slice';

// Theme
import theme from '../../theme';

const OrdersScreen = ({ navigation }) => {
  const orders = useSelector((state) => state.orders.orders);
  const isLoading = useSelector((state) => state.orders.isLoading);
  const error = useSelector((state) => state.orders.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const renderItem = (itemData) => {
    const { item } = itemData;
    return (
      <OrderItem
        id={item.id}
        items={item.items}
        date={item.date}
        total={item.total}
        status={item.status}
      />
    );
  };
  if (isLoading) return <SbLoading color={theme.colors.primary} />;
  if (error)
    return (
      <SbError
        errorText={error}
        buttonText="Попробовать снова"
        buttonHandler={() => {
          dispatch(getOrders());
        }}
      />
    );
  return (
    <View style={styles.container}>
      <SbHeading>Ваши заказы</SbHeading>
      {orders.length > 0 ? (
        <FlatList
          data={orders}
          renderItem={renderItem}
          refreshing={isLoading}
          onRefresh={() => {
            dispatch(getOrders());
          }}
        />
      ) : (
        <SbText>Похоже вы еще не сделали ни одного заказа</SbText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.padding.s,
  },
});

export const screenOptions = ({ navigation }) => {
  return {
    headerTitle: 'Ваши заказы',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={SbHeaderButton}>
        <Item
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          title="Меню"
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default OrdersScreen;
