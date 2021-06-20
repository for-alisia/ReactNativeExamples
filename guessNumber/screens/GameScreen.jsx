import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

// Components
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const random = Math.floor(Math.random() * (max - min)) + min;
  if (random === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return random;
  }
};

const GameScreen = ({ userChoice, onGameOver }) => {
  const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, userChoice));
  const [rounds, setRounds] = useState(0);

  const lowEdge = useRef(1);
  const highEdge = useRef(100);

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(rounds);
    }
  }, [currentGuess, onGameOver, userChoice]);

  const nextGuesshandler = (direction) => {
    if (
      (direction === 'lower' && currentGuess < userChoice) ||
      (direction === 'greater' && currentGuess > userChoice)
    ) {
      Alert.alert('Incorrect clue for your opponent!', 'Please, be more attentive', [
        { text: 'OK', style: 'cancel' },
      ]);
      return;
    }

    if (direction === 'lower') {
      highEdge.current = currentGuess;
    } else {
      lowEdge.current = currentGuess;
    }

    const next = generateRandomBetween(lowEdge.current, highEdge.current, currentGuess);
    setCurrentGuess(next);
    setRounds((rounds) => rounds + 1);
  };

  return (
    <View style={styles.screen}>
      <Text>You chose: {userChoice}</Text>
      <Text>Opponents Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title="LOWER" onPress={() => nextGuesshandler('lower')} />
        <Button title="GREATER" onPress={() => nextGuesshandler('greater')} />
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 24,
    width: '90%',
  },
});

export default GameScreen;
