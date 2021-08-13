// @ts-nocheck
import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// Components
import { SbHeaderButton, SbHeading, SbLoading, SbError } from '../../components/ui';
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
      <FlatList data={orders} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.padding.s,
  },
});

OrdersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Ваши заказы',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={SbHeaderButton}>
        <Item
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          title="Меню"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default OrdersScreen;
