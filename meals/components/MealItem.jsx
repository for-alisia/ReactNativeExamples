import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

// Icons
import { Ionicons } from '@expo/vector-icons';

// Components
import { Card } from './ui';

// Theme
import theme from '../theme';

// Utils
import { getRandomInt } from '../utils';

const MealItem = ({ item, onSelectMeal }) => {
  return (
    <Card style={styles.item}>
      <TouchableOpacity onPress={onSelectMeal} activeOpacity={0.75}>
        <View style={styles.meal}>
          <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
            <ImageBackground
              source={{ uri: item.imageUrl }}
              resizeMode="cover"
              style={styles.image}
            >
              <Text
                style={{
                  ...styles.title,
                  backgroundColor: theme.randomColors[getRandomInt(0, theme.randomColors.length)],
                }}
              >
                {item.title}
              </Text>
            </ImageBackground>
          </View>
          <View style={{ ...styles.mealRow, ...styles.mealDetails }}>
            <View style={{ ...styles.mealRow, ...styles.withDash }}>
              <Ionicons name="timer-outline" size={18} color="black" />
              <Text style={styles.withMargin}>{item.duration} min</Text>
            </View>
            <View style={{ ...styles.mealRow, ...styles.withDash }}>
              <Ionicons name="egg-outline" size={18} color="black" />
              <Text style={styles.withMargin}>{item.complexity} </Text>
            </View>
            <View style={{ ...styles.mealRow, ...styles.withDash, borderRightWidth: 0 }}>
              <Ionicons name="card-outline" size={18} color="black" />
              <Text style={styles.withMargin}>{item.affordability} </Text>
            </View>
            <View style={{ flexGrow: 1, alignItems: 'flex-end' }}>
              <Ionicons name="heart-outline" size={18} color="black" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  item: {
    width: '100%',
    height: 220,
    marginVertical: 8,
    backgroundColor: 'white',
  },
  meal: {},
  mealRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mealHeader: {
    height: '84%',
  },
  mealDetails: {
    paddingVertical: 8,
    paddingRight: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: 'hidden',
  },
  title: {
    padding: 8,
    fontSize: 14,
    fontFamily: 'open-sans-bold',
    color: 'white',
    maxWidth: 170,
    borderBottomRightRadius: 8,
    textAlign: 'center',
  },
  withDash: {
    borderRightColor: theme.colors.primary,
    borderRightWidth: 1,
    paddingHorizontal: 8,
  },
  withMargin: {
    marginLeft: 4,
  },
});

export default MealItem;
