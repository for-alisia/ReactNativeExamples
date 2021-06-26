// Dependencies
import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// Components
import MealList from '../components/MealList';
import { HeaderButton } from '../components/ui';

// Data
import { MEALS } from '../data/dummy-data';

const FavouritesScreen = ({ navigation }) => {
  const favMeals = MEALS.filter(meal => meal.id === 'm1' || meal.id === 'm2');

  return (
    <MealList navigation={navigation} dataList={favMeals}/>
  );
};


FavouritesScreen.navigationOptions = (navData) => {
 return {
   headerTitle: 'Your favourites',
   headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item title="Menu" iconName="ios-menu" onPress={() => {
        navData.navigation.toggleDrawer();
      }}/>
    </HeaderButtons>
  )
 } 
}


export default FavouritesScreen;
