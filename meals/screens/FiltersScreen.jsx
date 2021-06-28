import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';

// Components
import { HeaderButton, TitleText} from '../components/ui';
import FilterSwitch from '../components/FilterSwitch';

// Actions
import { setFilters } from '../store/actions/meals.actions';

// Theme
import theme from '../theme';

const FiltersScreen = (props) => {
  const { navigation } = props;

  const [isGluten, setIsGluten] = useState(false);
  const [isLactose, setIsLactose] = useState(false); 
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);

  const dispatch = useDispatch();

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGluten,
      lactoseFree: isLactose,
      vegan: isVegan,
      vegetarian: isVegetarian
    }

    dispatch(setFilters(appliedFilters));
  }, [isGluten, isLactose, isVegan, isVegetarian ])

  useEffect(() => {
    navigation.setParams({save: saveFilters})
  }, [saveFilters])

  return (
    <View style={styles.screen}>
      <TitleText color={theme.colors.accentColor}>Filters</TitleText>
      <View style={styles.filtersWrapper}>
        <FilterSwitch label="Gluten-free" value={isGluten} onChange={(newVal) => setIsGluten(newVal)}/>
        <FilterSwitch label="Lactose-free" value={isLactose} onChange={(newVal) => setIsLactose(newVal)}/>
        <FilterSwitch label="Vegan" value={isVegan} onChange={(newVal) => setIsVegan(newVal)}/>
        <FilterSwitch label="Vegetarian" value={isVegetarian} onChange={(newVal) => setIsVegetarian(newVal)}/>
      </View>     
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    padding: 32
  },
  filtersWrapper: {
    alignItems: 'center'
  }
});

FiltersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Filter Meals',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Menu" iconName="ios-menu" onPress={() => {
          navData.navigation.toggleDrawer();
        }}/>
      </HeaderButtons>
    ),
  headerRight: () => (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item title="Menu" iconName="ios-save" onPress={navData.navigation.getParam('save')}/>
    </HeaderButtons>
  )
}

}

export default FiltersScreen;
