import React from 'react';
import { View, StyleSheet } from 'react-native';

// Components
import SbText from './SbText';

// Theme
import theme from '../../theme';

const SbHeading = (props) => {
  const { children } = props;
  return (
    <View style={styles.container}>
      <View style={styles.headingWrapper}>
        <SbText style={styles.heading}>{children}</SbText>
        <View style={styles.line}></View>
      </View>
      <SbText style={styles.shadowHeading}>{children}</SbText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginTop: theme.margin.l,
    marginBottom: theme.margin.l,
  },
  headingWrapper: {
    alignSelf: 'flex-start',
  },
  heading: {},
  line: {
    height: 2,
    backgroundColor: theme.colors.secondary,
  },
  // Transform to theme or some other units
  shadowHeading: {
    fontFamily: theme.fonts.monserratBold,
    color: theme.colors.primaryLight,
    textTransform: 'uppercase',
    opacity: 0.25,
    fontSize: 40,
    position: 'absolute',
    top: -28,
    left: -6,
  },
});

export default SbHeading;
