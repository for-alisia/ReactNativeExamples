// Dependencies
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const TitleText = (props) => {
  const { color, style, children } = props;

  return (
    <View style={styles.wrapper}>
      <Text style={{...styles.text, color: color, ...style }}>{ children }</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 8
  },
  text: {
    textTransform: 'uppercase',
    fontSize: 24,
    fontFamily: 'open-sans',
    textAlign: 'center'
  }
});

export default TitleText;