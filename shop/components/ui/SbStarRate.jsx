import React from 'react';
import { View, StyleSheet } from 'react-native';

// Icons
import { FontAwesome } from '@expo/vector-icons';

// Theme
import theme from '../../theme';

const SbStarRate = (props) => {
  const { rate, style, color } = props;

  const createStars = () => {
    const stars = [];

    // Full start we get if rate > 0.5 (for example, if rate === 4.6 => we'll get 5 stars)
    for (let i = 1; i < 6; i++) {
      if (rate > i || (i - rate < 0.5 && rate < i)) {
        stars.push(<FontAwesome name="star" size={16} color={color} />);
      } else {
        stars.push(<FontAwesome name="star-o" size={16} color={color} />);
      }
    }

    return stars;
  };

  return (
    <View style={{ ...styles.container, ...style }}>
      {createStars().map((star, index) => (
        <View key={index}>{star}</View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

export default SbStarRate;
