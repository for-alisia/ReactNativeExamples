// Dependencies
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
} from 'react-native';

// Theme
import colors from '../constants/colors';

const MainButton = ({ children, onPress }) => {
  let ButtonComponent = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    // @ts-ignore
    ButtonComponent = TouchableNativeFeedback;
  }
  return (
    <View style={styles.buttonWrapper}>
      <ButtonComponent onPress={onPress} activeOpacity={0.5}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>{children}</Text>
        </View>
      </ButtonComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  buttonWrapper: {
    borderRadius: 4,
  },
  buttonText: {
    color: colors.light,
    fontFamily: 'open-sans',
    fontSize: 18,
  },
});

export default MainButton;
