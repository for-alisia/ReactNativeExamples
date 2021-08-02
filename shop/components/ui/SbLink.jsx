import React from 'react';
import { StyleSheet, View } from 'react-native';

// Components
import SbTouchable from './SbTouchable';
import SbText from './SbText';

// Theme
import theme from '../../theme';

const SbLink = (props) => {
  const { onPress, children, style } = props;
  return (
    <SbTouchable onPress={onPress}>
      <View style={{ ...styles.container, ...style }}>
        <SbText style={styles.link}>{children}</SbText>
        <View style={styles.line}></View>
      </View>
    </SbTouchable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    padding: theme.padding.s,
  },
  link: {
    fontFamily: theme.fonts.montserratReg,
    color: theme.colors.primary,
  },
  line: {
    height: 1,
    backgroundColor: theme.colors.secondary,
  },
});

export default SbLink;
