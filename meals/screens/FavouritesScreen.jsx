// Dependencies
import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';

// Components
import MealList from '../components/MealList';
import { HeaderButton } from '../components/ui';

// Data
import { MEALS } from '../data/dummy-data';

const FavouritesScreen = ({ navigation }) => {
  // @ts-ignore
  const favMeals = useSelector((state) => state.meals.favouriteMeals);

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
