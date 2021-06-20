import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = ({ children, cardStyles }) => {
  return <View style={{ ...styles.cardContainer, ...cardStyles }}>{children}</View>;
};

const styles = StyleSheet.create({
  cardContainer: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.15,
    backgroundColor: 'white',
    elevation: 5,
    padding: 24,
    borderRadius: 8,
  },
});

export default Card;
