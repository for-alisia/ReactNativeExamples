// Dependencies
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground } from 'react-native';

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
          activeOpacity={0.8}
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
    color: 'white',
  },
  image: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: 8,
    shadowColor: 'black',
    shadowOpacity: 0.16,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBack: {
    padding: 8,
    borderRadius: 4,
    minWidth: '80%',
    alignItems: 'center',
  },
});

export default CategoryItem;
