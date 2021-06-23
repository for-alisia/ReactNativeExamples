// Dependencies
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

const CategoryItem = ({ itemData, navigation }) => {
  return (
    <TouchableOpacity
      style={{ ...styles.gridItem, backgroundColor: itemData.item.color }}
      onPress={() => {
        navigation.navigate({
          routeName: 'CategoryMeals',
          params: {
            categoryId: itemData.item.id,
          },
        });
      }}
    >
      <View>
        <Text style={styles.gridItemText}>{itemData.item.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    height: 160,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridItemText: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
  },
});

export default CategoryItem;
