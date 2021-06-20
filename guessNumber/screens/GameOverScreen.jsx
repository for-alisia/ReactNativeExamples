import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

// Components
import NumberContainer from '../components/NumberContainer';

// Theme
import colors from '../constants/colors';

const GameOverScreen = ({ rounds, number, onRestart }) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.congrats}>Congratulations!</Text>
      <Text style={styles.title}>Your number is:</Text>
      <NumberContainer>{number}</NumberContainer>
      <Text style={styles.rounds}>It took {rounds} rounds to guess your number</Text>
      <View style={styles.buttonContainer}>
        <Button title="PLAY AGAIN" color={colors.primary} onPress={onRestart} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 100,
  },
  congrats: {
    fontSize: 40,
    color: colors.primary,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
  },
  rounds: {
    fontSize: 16,
    color: colors.secondary,
    marginVertical: 16,
  },
  buttonContainer: {
    width: 120,
  },
});

export default GameOverScreen;
