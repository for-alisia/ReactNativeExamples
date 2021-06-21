import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Components
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';

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
  const initialGuess = generateRandomBetween(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [rounds, setRounds] = useState([initialGuess]);

  const lowEdge = useRef(1);
  const highEdge = useRef(100);

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(rounds.length);
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
      lowEdge.current = currentGuess + 1;
    }

    const next = generateRandomBetween(lowEdge.current, highEdge.current, currentGuess);
    setCurrentGuess(next);
    setRounds((rounds) => [next, ...rounds]);
  };

  return (
    <View style={styles.screen}>
      <Text>You chose: {userChoice}</Text>
      <Text>Opponents Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={() => nextGuesshandler('lower')}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton onPress={() => nextGuesshandler('greater')}>
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
      <ScrollView>
        {rounds.map((round, idx) => (
          <View key={round} style={styles.listItem}>
            <BodyText>{idx + 1}.</BodyText>
            <BodyText>{round}</BodyText>
          </View>
        ))}
      </ScrollView>
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
  listItem: {},
});

export default GameScreen;
