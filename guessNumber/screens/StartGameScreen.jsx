import React from 'react';
import { View, StyleSheet, Text, TextInput, Button } from 'react-native';

// Components
import Card from '../components/Card';

// Theme
import colors from '../constants/colors';

const StartGameScreen = () => {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Start a new game!</Text>
      <Card cardStyles={styles.inputContainer}>
        <Text>Select a number</Text>
        <TextInput />
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <Button title="RESET" color={colors.secondary} onPress={() => {}} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="CONFIRM" color={colors.primary} onPress={() => {}} />
          </View>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 8,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginVertical: 16,
    color: colors.primary,
    marginBottom: 24,
  },
  inputContainer: {
    width: '90%',
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
  },
  buttonContainer: {
    width: 96,
  },
});

export default StartGameScreen;
