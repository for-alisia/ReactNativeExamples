// Dependencies
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

// Components
import MealItem from '../components/MealItem';

// Data
import { CATEGORIES, MEALS } from '../data/dummy-data';

const CategoryMealsScreen = ({ navigation }) => {
  const id = navigation.getParam('categoryId');

  const mealsByCat = MEALS.filter((meal) => meal.categorIds.indexOf(id) >= 0);

  const renderMealItem = (itemData) => {
    return (
      <MealItem
        item={itemData.item}
        onSelectMeal={() => {
          navigation.navigate({ routeName: 'MealDetail', params: { mealId: itemData.item.id } });
        }}
      />
    );
  };

  return (
    <View style={styles.screen}>
      <FlatList
        style={{ width: '100%' }}
        data={mealsByCat}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  );
};

CategoryMealsScreen.navigationOptions = (navigationData) => {
  const category = CATEGORIES.find(
    (cat) => cat.id === navigationData.navigation.getParam('categoryId')
  );

  return {
    headerTitle: category && category.title,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
});

export default CategoryMealsScreen;
