// Dependencies
import React from 'react';
import { View, StyleSheet, Button, ScrollView, Image, SafeAreaView, ColorPropType } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// Components
import { BodyText, HeaderButton, IconWithText, CustomButton, TitleText } from '../components/ui';
import IngredientsList from '../components/IngredientsList';
import StepsList from '../components/StepsList';

// Data
import { MEALS } from '../data/dummy-data';
import theme from '../theme';

const MealDetailScreen = ({ navigation }) => {
  const mealId = navigation.getParam('mealId');

  const meal = MEALS.find((meal) => meal.id === mealId);

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
  const mealId = navigationData.navigation.getParam('mealId');
  const meal = MEALS.find((meal) => meal.id === mealId);

  return {
    headerTitle: meal && meal.title,
    headerRight: () => (
      // Button in a header
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Favourite" iconName="heart-outline" onPress={() => {}} />
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
