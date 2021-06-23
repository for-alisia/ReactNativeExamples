import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';

// Components
import CategoryItem from '../components/CategoryItem';

// Data
import { CATEGORIES } from '../data/dummy-data';

const CategoriesScreen = ({ navigation }) => {
  const renderItem = (itemData) => {
    return <CategoryItem itemData={itemData} navigation={navigation} />;
  };
  return (
    <View style={styles.screen}>
      <FlatList numColumns={2} data={CATEGORIES} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    margin: 16,
    justifyContent: 'center',
  },
});

export default CategoriesScreen;
