import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Components
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';
import colors from '../constants/colors';

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
    setRounds((rounds) => [...rounds, next]);
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
      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.list}>
          {rounds.map((round, idx) => (
            <Card key={round} style={styles.listItem}>
              <BodyText style={styles.idxText}>{idx + 1}.</BodyText>
              <BodyText style={styles.roundText}>{round}</BodyText>
            </Card>
          ))}
        </ScrollView>
      </View>
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
    marginTop: Dimensions.get('window').height > 800 ? 24 : 8,
    width: '90%',
  },
  listContainer: {
    width: '100%',
    flex: 1,
  },
  list: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexGrow: 1,
  },
  listItem: {
    marginVertical: 8,
    backgroundColor: colors.light,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '90%',
  },
  idxText: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
    marginRight: 16,
  },
  roundText: {
    fontSize: 16,
    fontFamily: 'open-sans-bold',
    color: colors.secondary,
  },
});

export default GameScreen;
