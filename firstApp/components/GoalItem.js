import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GoalItem = (props) => (
  <View style={styles.listItem}>
    <Text>{props.title}</Text>
  </View>
);

const styles = StyleSheet.create({
  listItem: {
    padding: 8,
    borderColor: 'darkturquoise',
    borderWidth: 1,
    marginVertical: 4,
  },
});

export default GoalItem;
