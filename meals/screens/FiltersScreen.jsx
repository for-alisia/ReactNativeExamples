import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// Components
import { HeaderButton } from '../components/ui';

const FiltersScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Categories</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
    )}

}

export default FiltersScreen;
