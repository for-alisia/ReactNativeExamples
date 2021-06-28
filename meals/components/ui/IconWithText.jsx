import React from 'react';
import { View, StyleSheet } from 'react-native';

// Components
import { BodyText } from './index';

// Icons
import { Ionicons } from '@expo/vector-icons';

// Theme
import theme from '../../theme';

const IconWithText = (props) => {
  const { icon, text } = props;
  return (
    <View style={{...styles.container, ...props.style}}>
      <Ionicons name={icon} size={18} color={theme.colors.primary} />
      <BodyText style={styles.text}>{text}</BodyText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRightColor: theme.colors.primary,
    borderRightWidth: 1,
    paddingHorizontal: 8,
  },
  text: {
    marginLeft: 4,
    color: theme.colors.primary
  }
});

export default IconWithText;