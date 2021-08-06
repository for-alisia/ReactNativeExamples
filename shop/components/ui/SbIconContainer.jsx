import React from 'react';
import { View } from 'react-native';

const SbIconContainer = ({ children, width, height }) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width,
        height,
      }}
    >
      {children}
    </View>
  );
};

export default SbIconContainer;
