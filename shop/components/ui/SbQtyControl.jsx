import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

// Components
import SbTouchable from './SbTouchable';
import SbText from './SbText';

// Theme
import theme from '../../theme';

const SbQtyControl = ({ qty, onAdd, onSubstract }) => {
  return (
    <View style={styles.container}>
      <SbTouchable onPress={onSubstract}>
        <View style={styles.iconContainer}>
          <AntDesign name="minus" size={16} color={theme.colors.greyLight} />
        </View>
      </SbTouchable>
      <SbText style={styles.text}>{qty}</SbText>
      <SbTouchable onPress={onAdd}>
        <View style={styles.iconContainer}>
          <AntDesign name="plus" size={16} color={theme.colors.greyLight} />
        </View>
      </SbTouchable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minWidth: 90,
    paddingHorizontal: theme.padding.m,
    paddingVertical: theme.padding.xs,
    borderColor: theme.colors.greyLight,
    borderWidth: 1,
    borderRadius: theme.borderRadius.m,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 24,
    width: 24,
  },
  text: {
    color: theme.colors.greyLight,
  },
});

export default SbQtyControl;
