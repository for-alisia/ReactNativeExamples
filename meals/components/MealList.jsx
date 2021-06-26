// Dependencies
import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

// Components
import MealItem from './MealItem';

const MealList = ( {navigation, dataList} ) => {
  // Function to render an Item
  const renderMealItem = (itemData) => {
    const { item } = itemData;
    return (
      <MealItem
        item={item}
        onSelectMeal={() => {
          navigation.navigate({ routeName: 'MealDetail', params: { mealId: item.id } });
        }}
      />
    );
  };

  return (
    <View style={styles.list}>
      <FlatList
        style={{ width: '100%' }}
        data={dataList}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
});

export default MealList;