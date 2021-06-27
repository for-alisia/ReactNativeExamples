// Dependencies
import React from 'react';
import {View, StyleSheet} from 'react-native';

// Components
import { BodyText } from './ui';

// Theme
import theme from '../theme';

const StepsList = ({ dataList }) => {
  return (
    <View style={styles.container}>
      { dataList.map((step, idx) => (
        <View key={step} style={styles.step}>
          <BodyText style={styles.numberText}>{idx + 1}</BodyText>
          <BodyText style={{ flexShrink: 1}}>{step}</BodyText>   
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 8
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    paddingHorizontal: 8
  },
  numberText: {
    marginRight: 8,
    backgroundColor: theme.colors.accentColor,
    color: 'white',
    fontSize: 16,
    fontFamily: 'open-sans-bold',
    width: 24,
    height: 24,
    textAlign: 'center',
    borderRadius: 12
  }
});

export default StepsList;