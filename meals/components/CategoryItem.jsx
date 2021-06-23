// Dependencies
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground } from 'react-native';
import theme from '../theme';

const CategoryItem = ({ itemData, navigation }) => {
  return (
    <View style={styles.gridItem}>
      <ImageBackground
        source={{ uri: itemData.item.img }}
        style={styles.image}
        resizeMode="cover"
        fadeDuration={300}
      >
        <TouchableOpacity
          style={styles.textContainer}
          onPress={() => {
            navigation.navigate({
              routeName: 'CategoryMeals',
              params: {
                categoryId: itemData.item.id,
              },
            });
          }}
        >
          <View style={{ ...styles.textBack, backgroundColor: itemData.item.color }}>
            <Text style={styles.gridItemText}>{itemData.item.title}</Text>
          </View>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 8,
    height: 128,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridItemText: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
    textTransform: 'uppercase',
    color: theme.colors.primary,
  },
  image: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
  },
  textBack: {
    padding: 8,
    opacity: 0.8,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
    width: '100%',
    alignItems: 'center',
  },
});

export default CategoryItem;
