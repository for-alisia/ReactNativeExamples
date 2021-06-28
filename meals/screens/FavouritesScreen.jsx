// Dependencies
import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';

// Components
import MealList from '../components/MealList';
import { HeaderButton, TitleText } from '../components/ui';

// Theme
import theme from '../theme';


const FavouritesScreen = ({ navigation }) => {
  // @ts-ignore
  const favMeals = useSelector((state) => state.meals.favouriteMeals);

  if (favMeals.length === 0 || !favMeals) {
    return (
      <View style={styles.screen}>
        <TitleText color={theme.colors.primary}>No favourite meals here. Start adding some!</TitleText>
      </View>
    )
  }

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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32
  }
})


export default FavouritesScreen;
