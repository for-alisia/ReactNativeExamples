import React from 'react';
import { View, StyleSheet, FlatList, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// Components
import { SbHeaderButton, SbHeading } from '../../components/ui';
import { OrderItem } from '../../components/shop';

// Theme
import theme from '../../theme';

const OrdersScreen = ({ navigation }) => {
  // @ts-ignore
  const orders = useSelector((state) => state.orders.orders);

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
