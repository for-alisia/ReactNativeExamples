import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const GoalItem = ({ title, onDelete, id }) => (
  <TouchableOpacity onPress={() => onDelete(id)} activeOpacity={0.8}>
    <View style={styles.listItem}>
      <Text>{title}</Text>
    </View>
  </TouchableOpacity>
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
