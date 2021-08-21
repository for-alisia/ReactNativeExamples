import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';

// Components
import { SbText, SbHeading, SbLink, SbHeaderButton } from '../../components/ui';

// Theme
import theme from '../../theme';

const BranchDetailSreen = ({ navigation, route }) => {
  const branchId = route.params.branchId;

  const branch = useSelector((state) => {
    // @ts-ignore
    const branch = state.branches.items[branchId];
    return { ...branch, id: branchId };
  });

  return (
    <View style={styles.screen}>
      <SbHeading>{branch.title}</SbHeading>
      <SbText>{branch.description}</SbText>
    </View>
  );
};

export const screenOptions = ({ navigation, route }) => {
  return {
    title: route.params.branchTitle,
  };
};

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: theme.padding.m,
  },
});

export default BranchDetailSreen;
