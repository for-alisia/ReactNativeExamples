import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
} from 'react-native';

// Components
import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';

// Theme
import colors from '../constants/colors';

const StartGameScreen = ({ onStart }) => {
  const [enteredVal, setEnteredVal] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const numberInputHandler = (inputText) => {
    setEnteredVal(inputText.replace(/[^0-9]/g, ''));
  };
  const resetInputHandler = () => {
    setEnteredVal('');
    setConfirmed(false);
  };
  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredVal);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert('Invalid number', 'Number has to be between 1 and 99', [
        { text: 'OK', style: 'destructive', onPress: resetInputHandler },
      ]);
      return;
    }
    setConfirmed(true);
    // @ts-ignore
    setSelectedNumber(chosenNumber);
    setEnteredVal('');
    Keyboard.dismiss();
  };

  const startGameHadler = () => {
    if (!selectedNumber) {
      Alert.alert('Choose a number', 'Number has to be between 1 and 99', [
        { text: 'OK', style: 'destructive', onPress: resetInputHandler },
      ]);
      return;
    }
    onStart(selectedNumber);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Text style={styles.title}>Start a new game!</Text>
        <Card style={styles.inputContainer}>
          <BodyText>Select a number</BodyText>
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
              <Button title="RESET" color={colors.secondary} onPress={resetInputHandler} />
            </View>
            <View style={styles.buttonContainer}>
              <Button title="CONFIRM" color={colors.primary} onPress={confirmInputHandler} />
            </View>
          </View>
        </Card>
        {confirmed && (
          <Card style={styles.outputContainer}>
            <BodyText style={styles.outputTitle}>You Selected number</BodyText>
            <NumberContainer>{selectedNumber}</NumberContainer>
            <MainButton onPress={startGameHadler}>START GAME</MainButton>
          </Card>
        )}
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
    fontFamily: 'open-sans-bold',
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
    minWidth: 300,
    maxWidth: '95%',
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
  },
  buttonContainer: {
    width: Dimensions.get('window').width * 0.26,
  },
  outputContainer: {
    marginVertical: 32,
    alignItems: 'center',
    width: '90%',
  },
  outputTitle: {
    textTransform: 'uppercase',
    fontSize: 16,
  },
});

export default StartGameScreen;
