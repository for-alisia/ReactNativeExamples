// Dependencies
import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { useSelector } from 'react-redux';

// Redux

const ProductsOverviewScreen = () => {
  // @ts-ignore
  const products = useSelector((state) => state.products.availableProducts);

  const renderItem = (itemData) => {
    const { item } = itemData;

    return (
      <View>
        <Text>{item.title}</Text>
      </View>
    );
  };

  return <FlatList data={products} renderItem={renderItem} />;
};

export default ProductsOverviewScreen;
