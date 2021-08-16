import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';

// Components
import { SbLoading } from '../components/ui';

// theme
import theme from '../theme';

// Actions
import { authenticateFromStore } from '../store/auth.slice';

const StartupScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');

      console.log(userData);
      if (!userData) {
        props.navigation.navigate('Auth');
        return;
      }
      const { token, userId, expireDate } = JSON.parse(userData);
      const expirationDate = new Date(expireDate);

      if (expirationDate <= new Date() || !token || !userId) {
        props.navigation.navigate('Auth');
        return;
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime();

      props.navigation.navigate('Shop');
      dispatch(
        authenticateFromStore({ idToken: token, localId: userId, expireDate }, expirationTime)
      );
    };

    tryLogin();
  }, []);
  return (
    <View style={styles.screen}>
      <SbLoading color={theme.colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StartupScreen;
