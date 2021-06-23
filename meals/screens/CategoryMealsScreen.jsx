// Dependencies
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

// Data
import { CATEGORIES, MEALS } from '../data/dummy-data';

const CategoryMealsScreen = ({ navigation }) => {
  const id = navigation.getParam('categoryId');
  const selectedCategory = CATEGORIES.find((cat) => cat.id === id);

  return (
    <View style={styles.screen}>
      <Text>{selectedCategory && selectedCategory.title}</Text>
      <Button
        title="Go to details"
        onPress={() => {
          navigation.navigate({ routeName: 'MealDetail' });
        }}
      />
      <Button
        title="Go Back"
        onPress={() => {
          navigation.goBack();
          // navigation.pop();
        }}
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
  },
});

export default CategoryMealsScreen;
