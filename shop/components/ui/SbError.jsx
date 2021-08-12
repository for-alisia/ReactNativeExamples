import React from 'react';
import { View, StyleSheet } from 'react-native';

// Components
import SbText from './SbText';
import SbButton from './SbButton';
import SbTitle from './SbTitle';

// theme
import theme from '../../theme';

const SbError = ({ errorText, buttonText, buttonHandler }) => {
  return (
    <View style={styles.container}>
      <SbText style={styles.errorText}>{errorText}</SbText>
      <SbButton onPress={buttonHandler} type="outline">
        {buttonText}
      </SbButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    marginBottom: theme.margin.l,
  },
});

export default SbError;
