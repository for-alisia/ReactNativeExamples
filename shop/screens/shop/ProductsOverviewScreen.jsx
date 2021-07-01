// Dependencies
import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { useSelector } from 'react-redux';

// Components
import { ProductItem } from '../../components/shop';

const ProductsOverviewScreen = () => {
  // @ts-ignore
  const products = useSelector((state) => state.products.availableProducts);

  const renderItem = (itemData) => {
    const { item } = itemData;

    return <ProductItem item={item} />;
  };

  return <FlatList data={products} renderItem={renderItem} />;
};

ProductsOverviewScreen.navigationOptions = {
  headerTitle: 'All Products',
};

export default ProductsOverviewScreen;
