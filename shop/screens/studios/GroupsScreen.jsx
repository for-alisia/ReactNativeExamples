import React from 'react';
import { View, StyleSheet } from 'react-native';

// Components
import { SbText, SbHeading, SbLink } from '../../components/ui';

// Theme
import theme from '../../theme';

const GroupsSreen = () => {
  return (
    <View style={styles.screen}>
      <SbHeading>Группы</SbHeading>
      <SbText>Здесь будут группы</SbText>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {},
});

export default GroupsSreen;
