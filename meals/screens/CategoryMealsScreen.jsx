// Dependencies
import React from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native';

// Components
import MealList from '../components/MealList';
import { TitleText } from '../components/ui';

// Data
import { CATEGORIES } from '../data/dummy-data';

// Theme
import theme from '../theme';

const CategoryMealsScreen = ({ navigation }) => {
  const id = navigation.getParam('categoryId');

  // @ts-ignore
  const availableMeals = useSelector((state) => state.meals.filteredMeals);

  const mealsByCat = availableMeals.filter((meal) => meal.categorIds.indexOf(id) >= 0);

  if (mealsByCat.length === 0) {
    return (
      <View style={styles.screen}>
        <TitleText color={theme.colors.primary}>No available meals here. To get meals, check you filters, please</TitleText>
      </View>
    )
  }

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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32
  }
})

export default CategoryMealsScreen;
