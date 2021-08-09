import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

// Components
import SbText from './SbText';
import SbIconContainer from './SbIconContainer';

// Theme
import theme from '../../theme';

const SbQtyControl = ({ qty, onAdd, onSubstract }) => {
  return (
    <View style={styles.container} testID="control-ui">
      <SbIconContainer width={24} height={24} onPress={onSubstract} testID="control-minus">
        <AntDesign name="minus" size={16} color={theme.colors.greyLight} />
      </SbIconContainer>
      <SbText style={styles.text}>{qty}</SbText>
      <SbIconContainer onPress={onAdd} width={24} height={24} testID="control-plus">
        <AntDesign name="plus" size={16} color={theme.colors.greyLight} />
      </SbIconContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minWidth: 100,
    paddingHorizontal: theme.padding.m,
    paddingVertical: theme.padding.xs,
    borderColor: theme.colors.greyLight,
    borderWidth: 1,
    borderRadius: theme.borderRadius.m,
  },
  text: {
    color: theme.colors.greyLight,
  },
});

export default SbQtyControl;
