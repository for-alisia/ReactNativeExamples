import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const MealDetailScreen = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <Text>Meal Details Screen</Text>
      <Button
        title="Go to categories"
        onPress={() => {
          navigation.popToTop();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MealDetailScreen;
