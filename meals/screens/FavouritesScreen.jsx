// Dependencies
import React from 'react';

// Components
import MealList from '../components/MealList';

// Data
import { MEALS } from '../data/dummy-data';

const FavouritesScreen = ({ navigation }) => {
  const favMeals = MEALS.filter(meal => meal.id === 'm1' || meal.id === 'm2')
  return (
    <MealList navigation={navigation} dataList={favMeals}/>
  );
};


FavouritesScreen.navigationOptions = {
  headerTitle: 'Your favourites'
}

export default FavouritesScreen;
