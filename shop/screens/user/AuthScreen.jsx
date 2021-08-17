import React, { useCallback, useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

// Conmponents
import {
  SbText,
  SbInput,
  SbCard,
  SbHeading,
  SbBottomButton,
  SbLink,
  SbLoading,
} from '../../components/ui';

// Hooks
import useInput from '../../hooks/useInput';

// Validators
import { isRequired, isLonger, isEmail } from '../../utils/validators';

// Actions
import { signup, login as loginAction } from '../../store/auth.slice';

// Theme
import theme from '../../theme';

const softReset = (input) => {
  if (input.hasError && input.value.trim() === '') {
    input.reset();
  }
};

const AuthScreen = ({ navigation }) => {
  // Inputs
  const login = useInput(isEmail);
  const password = useInput(isLonger.bind(null, 6));
  const name = useInput(isRequired);
  // Mode (login or signup)
  const [isLoginMode, setIsLoginMode] = useState(true);

  const dispatch = useDispatch();
  // @ts-ignore
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  // @ts-ignore
  const isLoading = useSelector((state) => state.user.isLoading);
  // @ts-ignore
  const error = useSelector((state) => state.user.error);

  // Form validity
  const isValid = isLoginMode
    ? login.isValid && password.isValid
    : login.isValid && password.isValid && name.isValid;

  const toSignupHandler = () => {
    setIsLoginMode(false);
    softReset(login);
    softReset(password);
  };

  const toLoginHandler = () => {
    setIsLoginMode(true);
    softReset(name);
    softReset(login);
    softReset(password);
  };

  const submitHandler = useCallback(() => {
    if (!isValid) {
      Alert.alert('Некорректная форма', 'Проверьте правильность заполнения полей формы', [
        { text: 'OK' },
      ]);
      return;
    }
    if (!isLoginMode) {
      dispatch(signup(login.value, password.value, name.value));
    } else {
      dispatch(loginAction(login.value, password.value));
    }
  }, [
    isValid,
    login.value,
    login.isValid,
    password.value,
    password.isValid,
    name.value,
    name.isValid,
    isLoginMode,
  ]);

  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate('Shop');
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (error) {
      Alert.alert('Ошибка авторизации', error, [{ text: 'OK' }]);
    }
  }, [error]);

  if (isLoading) return <SbLoading />;
  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={-200} style={styles.screen}>
      <ScrollView>
        <View style={styles.wrapper}>
          <SbHeading>Авторизация</SbHeading>
          <View style={styles.cardWrapper}>
            <SbCard style={styles.authCard}>
              {!isLoginMode && (
                <SbInput
                  label="Имя"
                  errorText="Укажите ваше имя"
                  value={name.value}
                  hasError={name.hasError}
                  onChangeHandler={name.onChangeText}
                  onBlurHandler={name.onBlur}
                />
              )}
              <SbInput
                label="Email"
                errorText="Укажите email"
                value={login.value}
                hasError={login.hasError}
                onChangeHandler={login.onChangeText}
                onBlurHandler={login.onBlur}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              <SbInput
                label="Пароль"
                errorText="Укажите пароль (более 6 символов)"
                value={password.value}
                hasError={password.hasError}
                onChangeHandler={password.onChangeText}
                onBlurHandler={password.onBlur}
                autoCapitalize="none"
                secureTextEntry
              />
              {isLoginMode ? (
                <SbLink style={styles.linkStyle} onPress={toSignupHandler}>
                  Нет аккаунта? Зарегистрироваться
                </SbLink>
              ) : (
                <SbLink style={styles.linkStyle} onPress={toLoginHandler}>
                  Есть аккаунт? Войти
                </SbLink>
              )}
            </SbCard>
          </View>
        </View>
      </ScrollView>
      <SbBottomButton onPress={submitHandler}>
        <View style={styles.buttonContent}>
          <SbText style={styles.textButton}>{isLoginMode ? 'Войти' : 'Регистрация'}</SbText>
          <AntDesign name="login" size={24} color={theme.colors.light} />
        </View>
      </SbBottomButton>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  wrapper: {
    padding: theme.padding.m,
    flex: 1,
  },
  cardWrapper: {
    flexDirection: 'row',
    marginTop: theme.margin.xl,
  },
  authCard: {
    padding: theme.padding.xl,
  },
  linkStyle: {
    marginTop: theme.margin.xl,
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textButton: {
    color: theme.colors.light,
    marginRight: theme.margin.m,
  },
});

export default AuthScreen;
