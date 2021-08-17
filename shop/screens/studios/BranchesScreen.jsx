import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// Components
import { SbText, SbHeading, SbLink, SbHeaderButton } from '../../components/ui';

// Theme
import theme from '../../theme';

const BranchesSreen = () => {
  return (
    <View style={styles.screen}>
      <SbHeading>Филиалы</SbHeading>
      <SbText>Здесь будут филиалы</SbText>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: theme.padding.s,
  },
});

export const screenOptions = ({ navigation }) => {
  return {
    title: 'Филиалы',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={SbHeaderButton}>
        <Item
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          title="Меню"
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={SbHeaderButton}>
        <Item
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
          title="Добавить филиал"
          onPress={() => {
            navigation.navigate('BranchCreate');
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default BranchesSreen;
