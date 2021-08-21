import React from 'react';
import { View, StyleSheet, Platform, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';

// Components
import { SbText, SbHeading, SbLink, SbHeaderButton, SbTitle, SbCard } from '../../components/ui';
import { BranchItem } from '../../components/studios';

// Theme
import theme from '../../theme';

const BranchesSreen = ({ navigation }) => {
  const branches = useSelector((state) => {
    const arr = [];

    // @ts-ignore
    Object.keys(state.branches.items).forEach((key) => {
      // @ts-ignore
      arr.push({ ...state.branches.items[key], id: key });
    });

    return arr;
  });

  const renderItems = ({ item }) => {
    return (
      <BranchItem
        item={item}
        onSelect={() => {
          console.log('Pressed onSelect');
          navigation.navigate('BranchDetail', { branchTitle: item.title, branchId: item.id });
        }}
      />
    );
  };

  return (
    <View style={styles.screen}>
      <SbHeading>Филиалы</SbHeading>
      <FlatList data={branches} renderItem={renderItems} />
    </View>
  );
};

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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: theme.padding.m,
  },
});

export default BranchesSreen;
