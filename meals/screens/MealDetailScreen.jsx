// Dependencies
import React, { useEffect, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Image, SafeAreaView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

// Components
import { HeaderButton, IconWithText, CustomButton, TitleText } from '../components/ui';
import IngredientsList from '../components/IngredientsList';
import StepsList from '../components/StepsList';

// Actions
import { toggleFavourite } from '../store/actions/meals.actions';

import theme from '../theme';

const MealDetailScreen = ({ navigation }) => {
  const mealId = navigation.getParam('mealId');
  // @ts-ignore
  const isFavMeals = useSelector(state => state.meals.favouriteMeals.some(meal => meal.id === mealId))
  // @ts-ignore
  const availableMeals = useSelector(( state ) => state.meals.meals);

  const meal = availableMeals.find((meal) => meal.id === mealId);

  const dispatch = useDispatch();

  const toggleFavouriteHandler = useCallback(() => {
    dispatch(toggleFavourite(mealId))
  }, [mealId, dispatch])

  useEffect(() => {
    navigation.setParams({ toggleFav: toggleFavouriteHandler})
  }, [toggleFavouriteHandler]);

  useEffect(() => {
    navigation.setParams({isFav: isFavMeals})
  }, [isFavMeals])
  

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <Image source={{ uri: meal?.imageUrl}} resizeMode="cover" style={styles.image}/>
        <View style={styles.row}>
          <IconWithText text={meal?.duration} icon="timer-outline"/>
          <IconWithText text={meal?.complexity} icon="egg-outline"/>
          <IconWithText text={meal?.affordability} icon="card-outline" style={{ borderRightWidth: 0}}/>
        </View>
        <View style={styles.block}>
        <TitleText color={theme.colors.primary}>Ingredients</TitleText>
          <IngredientsList dataList={meal?.ingredients}/>
        </View>
        <View style={styles.block}>
          <TitleText color={theme.colors.primary}>How to cook</TitleText>
          <StepsList dataList={meal?.steps}/>
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton color={theme.colors.accentColor} outline
            onPress={() => {
              navigation.popToTop();
            }}>Go to Categories </CustomButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

MealDetailScreen.navigationOptions = (navigationData) => {
  const mealTitle = navigationData.navigation.getParam('mealTitle');
  const toggleFav = navigationData.navigation.getParam('toggleFav');
  const isFav = navigationData.navigation.getParam('isFav');

  return {
    headerTitle: mealTitle,
    headerRight: () => (
      // Button in a header
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Favourite" iconName={isFav ? "heart" : "heart-outline"} onPress={toggleFav} />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollView: {
  },
  image: {
    width: '100%',
    height: 300
  },
  row: {
    flexDirection: 'row',
    padding: 8,
    justifyContent: 'center'
  },
  block: {
    marginVertical: 16,
    alignItems: 'center',
    paddingHorizontal: 16
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 24
  }
});

export default MealDetailScreen;
