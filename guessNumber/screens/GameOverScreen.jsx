import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';

// Components
import NumberContainer from '../components/NumberContainer';

// Theme
import colors from '../constants/colors';
import dStyle from '../constants/default-styles';

const GameOverScreen = ({ rounds, number, onRestart }) => {
  return (
    <View style={styles.screen}>
      <Text style={{ ...dStyle.title, ...styles.congrats }}>Congratulations!</Text>
      <Image
        style={styles.image}
        // source={require('../assets/success.png')}
        source={{
          uri: 'https://images.unsplash.com/photo-1568966458805-bb9a8195ca54?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3150&q=80',
        }}
        fadeDuration={300}
        resizeMode="cover"
      />
      <Text style={{ ...dStyle.bodyText, ...styles.title }}>Your number is:</Text>
      <NumberContainer>{number}</NumberContainer>
      <Text style={{ ...dStyle.bodyText, ...styles.rounds }}>
        It took <Text style={styles.highlight}>{rounds} rounds</Text> to guess your number
      </Text>
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
    paddingTop: 40,
  },
  congrats: {
    fontSize: 32,
    color: colors.primary,
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
  },
  rounds: {
    fontSize: 16,
    color: colors.secondary,
    marginBottom: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    width: 120,
  },
  image: {
    width: '80%',
    height: 300,
    marginBottom: 16,
    borderRadius: 8,
  },
  highlight: {
    fontFamily: 'open-sans-bold',
    fontSize: 24,
    color: colors.primary,
  },
});

export default GameOverScreen;
