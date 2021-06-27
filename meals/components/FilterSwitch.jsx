// Dependencies
import React from 'react';
import { View, StyleSheet, Switch  } from 'react-native';

// Components
import { BodyText } from './ui';

// Theme
import theme from '../theme';

const FilterSwitch = ({ label, value, onChange}) => {

  return (
    <View style={styles.filterContainer}>
        <BodyText>{label}</BodyText>
        <Switch 
          trackColor={{ true: theme.colors.accentColor, false: theme.colors.primary}}
          thumbColor={theme.colors.light} 
          value={value} 
          onValueChange={onChange}
        />
    </View>
  )
} 

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 200,
    marginVertical: 16,
  }
});

export default FilterSwitch;