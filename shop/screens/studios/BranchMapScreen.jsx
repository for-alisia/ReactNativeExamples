import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// Components
import { SbText, SbHeading, SbLink, SbHeaderButton } from '../../components/ui';

// Theme
import theme from '../../theme';

const BranchMapSreen = () => {
  return (
    <View style={styles.screen}>
      <SbHeading>Карта</SbHeading>
      <SbText>Здесь будет карта для филиала</SbText>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {},
});

export default BranchMapSreen;
