import { useRef } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';

const Ball = () => {
  const animation = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  return (
    <View style={style.ballContainer}>
      <Text style={style.text}>My Ball</Text>
    </View>
  );
};

const style = StyleSheet.create({
  ballContainer: {
    backgroundColor: 'green',
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    textTransform: 'uppercase',
  },
});

export default Ball;
