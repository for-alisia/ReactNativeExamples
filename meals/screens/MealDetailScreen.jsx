// Dependencies
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// Components
import { HeaderButton } from '../components/ui';

// Data
import { MEALS } from '../data/dummy-data';

const MealDetailScreen = ({ navigation }) => {
  const mealId = navigation.getParam('mealId');

  const meal = MEALS.find((meal) => meal.id === mealId);

  return (
    <View style={styles.screen}>
      <Text>{meal && meal.title}</Text>
      <Button
        title="Go to categories"
        onPress={() => {
          navigation.popToTop();
        }}
      />
    </View>
  );
};

MealDetailScreen.navigationOptions = (navigationData) => {
  const mealId = navigationData.navigation.getParam('mealId');
  const meal = MEALS.find((meal) => meal.id === mealId);

  return {
    headerTitle: meal && meal.title,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Favourite" iconName="ios-star" onPress={() => {}} />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MealDetailScreen;
