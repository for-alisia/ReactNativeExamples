// Dependencies
import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { useSelector } from 'react-redux';

// Components
import { ProductItem } from '../../components/shop';

// Theme
import theme from '../../theme';

const ProductsOverviewScreen = () => {
  // @ts-ignore
  const products = useSelector((state) => state.products.availableProducts);

  const renderItem = (itemData) => {
    const { item } = itemData;

    return <ProductItem item={item} />;
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
