// Dependencies
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

// Components
import { ProductItem } from '../../components/shop';
import { SbHeaderButton, SbIconContainer, SbLoading, SbError } from '../../components/ui';

// Theme
import theme from '../../theme';

// Actions
import { addToCart, fetchCart } from '../../store/cart.slice';
import { fetchProducts } from '../../store/products.slice';

const ProductsOverviewScreen = (props) => {
  const { navigation } = props;

  // @ts-ignore
  const products = useSelector((state) => state.products.availableProducts);
  // @ts-ignore
  const isLoading = useSelector((state) => state.products.isLoading);
  // @ts-ignore
  const error = useSelector((state) => state.products.error);

  const dispatch = useDispatch();

  // Fetch products initially
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCart());
  }, [dispatch]);

  // Refetch products on every return to this screen
  useEffect(() => {
    const unsubscibe = props.navigation.addListener('focus', () => dispatch(fetchProducts()));

    return () => {
      unsubscibe();
    };
  }, [dispatch]);

  const renderItem = (itemData) => {
    const { item } = itemData;

    return (
      <ProductItem
        item={item}
        onSelect={() => {
          navigation.navigate('ProductDetail', { productId: item.id, productTitle: item.title });
        }}
      >
        <SbIconContainer onPress={() => console.log('Added to favourite!')} width={32} height={24}>
          <FontAwesome name="heart-o" size={24} color={theme.colors.primary} />
        </SbIconContainer>
        <SbIconContainer
          onPress={() => {
            dispatch(addToCart(item));
          }}
          width={32}
          height={24}
        >
          <MaterialIcons name="add-shopping-cart" size={24} color={theme.colors.primary} />
        </SbIconContainer>
      </ProductItem>
    );
  };

  if (isLoading) return <SbLoading color={theme.colors.primary} />;
  if (error) {
    return (
      <SbError
        // @ts-ignore
        errorText={error}
        buttonText="Попробовать снова"
        buttonHandler={() => dispatch(fetchProducts())}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        numColumns={2}
        refreshing={isLoading}
        onRefresh={() => dispatch(fetchProducts())}
      />
    </View>
  );
};

export const screenOptions = (navData) => ({
  headerTitle: 'Все товары',
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
  headerRight: () => (
    <HeaderButtons HeaderButtonComponent={SbHeaderButton}>
      <Item
        iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
        title="Корзина"
        onPress={() => {
          navData.navigation.navigate('Cart');
        }}
      />
    </HeaderButtons>
  ),
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.padding.s,
    paddingVertical: theme.padding.s,
  },
});

export default ProductsOverviewScreen;
