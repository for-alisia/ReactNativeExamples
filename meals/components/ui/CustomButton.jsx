// @ts-nocheck
// Dependencies
import React from 'react';
import { View, Text, TouchableOpacity, TouchableNativeFeedback, StyleSheet, Platform} from 'react-native';

// Theme
import theme from '../../theme';

const CustomButton = (props) => {
  const { onPress, color, style, children} = props;

  const textColor = props.outline ? color : 'white';
  const backgroundColor = props.outline ? 'transparent' : color;
  const borderColor = props.outline ? color : 'transparent';
  const borderWidth = props.outline ? 1 : 0;

  const ButtonComponent = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

  return (
    <View style={styles.wrapper}>
      <ButtonComponent onPress={onPress}>
        <View style={
          {...styles.container, 
            backgroundColor: backgroundColor, 
            borderColor: borderColor, 
            borderWidth: borderWidth
          }}>
          <Text style={{...styles.text, color: textColor}}>{children}</Text>
        </View>
      </ButtonComponent>
    </View>
    
  )
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 8,
  },
  text: {
    fontSize: 16,
    fontFamily: 'open-sans',
    textTransform: 'uppercase'
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4
  }
})

export default CustomButton;