// Dependencies
import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';

// Components
import { BodyText } from './ui';

// Theme
import theme from '../theme';

// Utils
import { getRandomInt } from '../utils';

const IngredientsList = ({ dataList }) => {
  return (
    <View style={styles.container}>
      {dataList.map(item => (
        <View style={{...styles.item, backgroundColor: theme.randomColors[getRandomInt(0, theme.randomColors.length)]}} key={item}>
          <BodyText style={{ color: 'white'}}>{item}</BodyText>
        </View>  
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  item: {
    margin: 4,
    padding: 10,
    borderRadius: 4,  
  }
});

export default IngredientsList;