import React from 'react';
import { Image, StyleSheet } from 'react-native';

const SbImage = (props) => {
  const { source, style, resize, base64 } = props;
  return (
    <Image
      source={{ uri: base64 ? `data:image/png;base64,${source}` : source }}
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
