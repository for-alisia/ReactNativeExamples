import React from 'react';
import { StyleSheet, View } from 'react-native';

// Components
import SbText from './SbText';
import SbTouchable from './SbTouchable';

// Theme
import theme from '../../theme';

// Supportes types: 'solid' and 'outline'

const SbDoubleButton = (props) => {
  const {
    onRightPress,
    onLeftPress,
    type,
    style,
    disabledRight,
    disabledLeft,
    leftLabel,
    rightLabel,
  } = props;

  const typeStyles = type || 'solid';
  const textStyles = typeStyles === 'solid' ? 'textSolid' : 'textOutlined';

  return (
    <View style={styles.wrapper}>
      <SbTouchable onPress={!disabledLeft ? onLeftPress : () => {}}>
        <View
          style={{
            ...styles.container,
            ...styles.containerLeft,
            ...styles[typeStyles],
            ...style,
            opacity: disabledLeft ? 0.68 : 1,
          }}
        >
          <SbText style={{ ...styles.text, ...styles[textStyles] }}>{leftLabel}</SbText>
        </View>
      </SbTouchable>
      <SbTouchable onPress={!disabledRight ? onRightPress : () => {}}>
        <View
          style={{
            ...styles.container,
            ...styles.containerRight,
            ...styles[typeStyles],
            ...style,
            opacity: disabledRight ? 0.68 : 1,
          }}
        >
          <SbText style={{ ...styles.text, ...styles[textStyles] }}>{rightLabel}</SbText>
        </View>
      </SbTouchable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
  },
  container: {
    paddingVertical: theme.padding.s,
    paddingHorizontal: theme.padding.xl,
    borderRadius: theme.borderRadius.l,
    alignSelf: 'center',
  },
  containerLeft: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRightWidth: 0,
  },
  containerRight: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  solid: {
    backgroundColor: theme.colors.primary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: theme.colors.primary,
    borderWidth: 1,
  },
  text: {
    fontSize: theme.fontSize.s,
    textAlign: 'center',
  },
  textSolid: {
    color: theme.colors.light,
  },
  textOutlined: {
    color: theme.colors.primary,
  },
});

export default SbDoubleButton;
