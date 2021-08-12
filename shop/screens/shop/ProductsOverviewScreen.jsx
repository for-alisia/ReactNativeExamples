// Dependencies
import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, StyleSheet, View, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

// Components
import { ProductItem } from '../../components/shop';
import { SbHeaderButton, SbIconContainer, SbLoading, SbText, SbError } from '../../components/ui';

// Theme
import theme from '../../theme';

// Actions
import { cartActions } from '../../store/cart.slice';
import { fetchProducts } from '../../store/products.slice';

const ProductsOverviewScreen = (props) => {
  const { navigation } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // @ts-ignore
  const products = useSelector((state) => state.products.availableProducts);

  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await dispatch(fetchProducts());
    } catch (err) {
      setError(err);
    }

    setIsLoading(false);
  }, []);

  // Fetch products initially
  useEffect(() => {
    loadProducts();
  }, [dispatch, loadProducts]);

  // Refetch products on every return to this screen
  useEffect(() => {
    const willFocusSub = props.navigation.addListener('willFocus', loadProducts);

    return () => {
      willFocusSub.remove();
    };
  }, [loadProducts]);

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
            dispatch(cartActions.addToCart(item));
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
        errorText={error.message}
        buttonText="Попробовать снова"
        buttonHandler={loadProducts}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList data={products} renderItem={renderItem} numColumns={2} />
    </View>
  );
};

ProductsOverviewScreen.navigationOptions = (navData) => ({
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
