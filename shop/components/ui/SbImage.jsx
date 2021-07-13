import React from 'react';
import { Image, StyleSheet } from 'react-native';

const SbImage = (props) => {
  const { source, style, resize } = props;
  return (
    <Image
      source={{ uri: source }}
      style={{ ...styles.image, ...style }}
      resizeMode={resize || 'cover'}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
  },
});

export default SbImage;
