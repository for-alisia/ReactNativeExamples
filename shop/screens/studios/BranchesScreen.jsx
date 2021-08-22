import React, { useEffect, useCallback } from 'react';
import { View, StyleSheet, Platform, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

// Components
import { SbHeading, SbHeaderButton, SbLoading, SbError } from '../../components/ui';
import { BranchItem } from '../../components/studios';

// Actions
import { getBranches } from '../../store/branches.slice';

// Theme
import theme from '../../theme';

const BranchesSreen = ({ navigation }) => {
  // @ts-ignore
  const isLoading = useSelector((state) => state.branches.isLoading);
  // @ts-ignore
  const error = useSelector((state) => state.branches.error);
  const branches = useSelector((state) => {
    const arr = [];

    // @ts-ignore
    Object.keys(state.branches.items).forEach((key) => {
      // @ts-ignore
      arr.push({ ...state.branches.items[key], id: key });
    });

    return arr;
  });

  const dispatch = useDispatch();

  const refetchBranches = useCallback(() => {
    dispatch(getBranches());
  }, [dispatch]);

  useEffect(() => {
    refetchBranches();
  }, [refetchBranches]);

  // Refetch branches on every return to this screen
  useEffect(() => {
    const unsubscibe = navigation.addListener('focus', refetchBranches);

    return () => {
      unsubscibe();
    };
  }, [dispatch]);

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

  if (isLoading) return <SbLoading />;
  if (error)
    return (
      <SbError
        errorText="Ошибка загрузки"
        buttonText="Попробовать еще"
        buttonHandler={refetchBranches}
      />
    );

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
