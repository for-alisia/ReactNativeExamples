import React, { useState } from 'react';
import { View, StyleSheet, Text, Button, TouchableWithoutFeedback, Keyboard } from 'react-native';

// Components
import Card from '../components/Card';
import Input from '../components/Input';

// Theme
import colors from '../constants/colors';

const StartGameScreen = () => {
  const [enteredVal, setEnteredVal] = useState('');
  const numberInputHandler = (inputText) => {
    setEnteredVal(inputText.replace(/[^0-9]/g, ''));
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Text style={styles.title}>Start a new game!</Text>
        <Card cardStyles={styles.inputContainer}>
          <Text>Select a number</Text>
          <Input
            inputStyles={styles.input}
            blurOnSubmit={true}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            maxLength={2}
            onChangeText={numberInputHandler}
            value={enteredVal}
          />
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
    </TouchableWithoutFeedback>
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
  input: {
    width: 80,
    textAlign: 'center',
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
