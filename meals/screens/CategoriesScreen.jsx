import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

// Components
import CategoryItem from '../components/CategoryItem';

// Data
import { CATEGORIES } from '../data/dummy-data';

const CategoriesScreen = ({ navigation }) => {
  const renderItem = (itemData) => {
    return <CategoryItem itemData={itemData} navigation={navigation} />;
  };
  return <FlatList numColumns={2} data={CATEGORIES} renderItem={renderItem} />;
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CategoriesScreen;
