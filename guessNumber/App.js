import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

// Components
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [rounds, setRounds] = useState(0);

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setRounds(0);
  };

  const gameOverHandler = (numOfRounds) => {
    setRounds(numOfRounds);
  };

  const restartGameHandler = () => {
    setUserNumber(undefined);
    setRounds(0);
  };

  return (
    <View style={styles.screen}>
      <Header title="Guess a number" />
      {userNumber && rounds <= 0 && (
        <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
      )}
      {userNumber && rounds > 0 && (
        <GameOverScreen rounds={rounds} number={userNumber} onRestart={restartGameHandler} />
      )}
      {!userNumber && <StartGameScreen onStart={startGameHandler} />}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
