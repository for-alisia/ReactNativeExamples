import React from 'react';
import { View, StyleSheet } from 'react-native';

// Components
import { SbCard, SbTitle, SbText, SbTouchable } from '../ui';

// Theme
import theme from '../../theme';

const BranchItem = ({ item, onSelect }) => {
  return (
    <SbCard style={styles.card}>
      <SbTouchable onPress={onSelect}>
        <View style={styles.branchWrapper}>
          <SbTitle>{item.title}</SbTitle>
          <SbText>{item.description}</SbText>
        </View>
      </SbTouchable>
    </SbCard>
  );
};

const styles = StyleSheet.create({
  branchWrapper: {
    paddingHorizontal: theme.padding.s,
    paddingVertical: theme.padding.m,
  },
  card: {
    marginBottom: theme.margin.s,
  },
});

export default BranchItem;
