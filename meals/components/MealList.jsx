// Dependencies
import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useSelector  } from 'react-redux';

// Components
import MealItem from './MealItem';

const MealList = ( {navigation, dataList} ) => {
  // @ts-ignore
  const favouriteMeals = useSelector(state => state.meals.favouriteMeals);
  // Function to render an Item
  const renderMealItem = (itemData) => {
    const { item } = itemData;
    const isFav = favouriteMeals.some(meal => meal.id === item.id); 
    return (
      <MealItem
        item={item}
        isFav={isFav}
        onSelectMeal={() => {
          navigation.navigate({ routeName: 'MealDetail', params: { 
              mealId: item.id, 
              mealTitle: item.title,
              isFav: isFav
            } 
          });
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