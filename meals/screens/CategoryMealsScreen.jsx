// Dependencies
import React from 'react';
import { useSelector } from 'react-redux';

// Components
import MealList from '../components/MealList';

// Data
import { CATEGORIES } from '../data/dummy-data';

const CategoryMealsScreen = ({ navigation }) => {
  const id = navigation.getParam('categoryId');

  // @ts-ignore
  const availableMeals = useSelector((state) => state.meals.filteredMeals);

  const mealsByCat = availableMeals.filter((meal) => meal.categorIds.indexOf(id) >= 0);

  return (
    <MealList navigation={navigation} dataList={mealsByCat}/>
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

export default CategoryMealsScreen;
