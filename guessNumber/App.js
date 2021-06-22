// @ts-ignore
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

// Components
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

// @ts-ignore
const fetchFonts = () => {
  return Font.loadAsync({
    // @ts-ignore
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    // @ts-ignore
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [rounds, setRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => {
          console.warn(err);
        }}
      />
    );
  }

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
    <SafeAreaView style={styles.screen}>
      <Header title="Guess a number" />
      {userNumber && rounds <= 0 && (
        <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
      )}
      {userNumber && rounds > 0 && (
        <GameOverScreen rounds={rounds} number={userNumber} onRestart={restartGameHandler} />
      )}
      {!userNumber && <StartGameScreen onStart={startGameHandler} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
