import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// Components
import CategoryItem from '../components/CategoryItem';
import { HeaderButton } from '../components/ui';

// Data
import { CATEGORIES } from '../data/dummy-data';

const CategoriesScreen = ({ navigation }) => {
  const renderItem = (itemData) => {
    return <CategoryItem itemData={itemData} navigation={navigation} />;
  };
  return (
    <View style={styles.screen}>
      <FlatList numColumns={2} data={CATEGORIES} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    margin: 16,
    justifyContent: 'center',
  },
});

CategoriesScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Meal Categories',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Menu" iconName="ios-menu" onPress={() => {
          navData.navigation.toggleDrawer();
        }}/>
      </HeaderButtons>
    )
  }
}

export default CategoriesScreen;
