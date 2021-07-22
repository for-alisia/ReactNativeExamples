// Dependencies
import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { useSelector } from 'react-redux';

// Components
import { ProductItem } from '../../components/shop';

// Theme
import theme from '../../theme';

const ProductsOverviewScreen = (props) => {
  const { navigation } = props;

  // @ts-ignore
  const products = useSelector((state) => state.products.availableProducts);

  const renderItem = (itemData) => {
    const { item } = itemData;

    const viewDetailHandler = () => {
      navigation.navigate('ProductDetail', { productId: item.id, productTitle: item.title });
    };

    const addtoFavoriteHandler = () => {
      console.log('To Favorite');
    };

    const addToCartHandler = () => {
      console.log('To Cart');
    };

    return (
      <ProductItem
        item={item}
        onAddToCart={addToCartHandler}
        onAddToFavorite={addtoFavoriteHandler}
        onViewDetail={viewDetailHandler}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList data={products} renderItem={renderItem} numColumns={2} />
    </View>
  );
};

ProductsOverviewScreen.navigationOptions = {
  headerTitle: 'All Products',
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.padding.s,
    paddingVertical: theme.padding.s,
  },
});

export default ProductsOverviewScreen;
