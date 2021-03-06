import React from 'react';
import { View,  StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useDispatch } from 'react-redux';

// Icons
import { Ionicons } from '@expo/vector-icons';

// Components
import { Card, BodyText, IconWithText } from './ui';

// Theme
import theme from '../theme';

// Utils
import { getRandomInt } from '../utils';

// Actions
import {toggleFavourite} from '../store/actions/meals.actions';

const MealItem = ({ item, onSelectMeal, isFav }) => {
  const dispatch = useDispatch();

  const addToFavHandler = () => {
    dispatch(toggleFavourite(item.id))
  }
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
              <BodyText
                style={{
                  ...styles.title,
                  backgroundColor: theme.randomColors[getRandomInt(0, theme.randomColors.length)],
                }}
              >
                {item.title}
              </BodyText>
            </ImageBackground>
          </View>
          <View style={{ ...styles.mealRow, ...styles.mealDetails }}>
            <IconWithText text={item?.duration} icon="timer-outline"/>
            <IconWithText text={item?.complexity} icon="egg-outline"/>
            <IconWithText text={item?.affordability} icon="card-outline" style={{ borderRightWidth: 0}}/>
            <TouchableOpacity onPress={addToFavHandler} activeOpacity={0.75} style={{ flexGrow: 1, alignItems: 'flex-end' }}>            
              <Ionicons name={isFav ? 'heart' : "heart-outline"} size={18} color={theme.colors.primary} />       
            </TouchableOpacity>           
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
});

export default MealItem;
