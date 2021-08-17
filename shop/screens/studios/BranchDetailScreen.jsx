import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// Components
import { SbText, SbHeading, SbLink, SbHeaderButton } from '../../components/ui';

// Theme
import theme from '../../theme';

const BranchDetailSreen = () => {
  return (
    <View style={styles.screen}>
      <SbHeading>Филиал</SbHeading>
      <SbText>Здесь будет описание филиала</SbText>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {},
});

export default BranchDetailSreen;
