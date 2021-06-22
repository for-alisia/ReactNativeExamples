// Dependencies
import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';

// Components
import NumberContainer from '../components/NumberContainer';
import MainButton from '../components/MainButton';

// Theme
import colors from '../constants/colors';
import dStyle from '../constants/default-styles';

const GameOverScreen = ({ rounds, number, onRestart }) => {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <Text style={{ ...dStyle.title, ...styles.congrats }}>Congratulations!</Text>
        <Image
          style={styles.image}
          // @ts-ignore
          source={require('../assets/success.png')}
          // source={{
          //   uri: 'https://images.unsplash.com/photo-1568966458805-bb9a8195ca54?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3150&q=80',
          // }}
          fadeDuration={300}
          resizeMode="cover"
        />
        <Text style={{ ...dStyle.bodyText, ...styles.title }}>Your number is:</Text>
        <NumberContainer>{number}</NumberContainer>
        <Text style={{ ...dStyle.bodyText, ...styles.rounds }}>
          It took <Text style={styles.highlight}>{rounds} rounds</Text> to guess your number
        </Text>
        <MainButton onPress={onRestart}>PLAY AGAIN</MainButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Dimensions.get('window').height > 800 ? 40 : 16,
  },
  congrats: {
    fontSize: Dimensions.get('window').height > 800 ? 32 : 24,
    color: colors.primary,
    marginBottom: Dimensions.get('window').height > 800 ? 32 : 8,
  },
  title: {
    fontSize: Dimensions.get('window').height > 800 ? 24 : 16,
  },
  rounds: {
    fontSize: 16,
    color: colors.secondary,
    marginBottom: Dimensions.get('window').height > 800 ? 16 : 8,
    textAlign: 'center',
  },
  image: {
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height * 0.3,
    marginBottom: Dimensions.get('window').height > 800 ? 16 : 8,
    borderRadius: 8,
  },
  highlight: {
    fontFamily: 'open-sans-bold',
    fontSize: Dimensions.get('window').height > 800 ? 24 : 16,
    color: colors.primary,
  },
});

export default GameOverScreen;
