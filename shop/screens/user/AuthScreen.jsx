import React, { useCallback, useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

// Conmponents
import { SbText, SbInput, SbCard, SbHeading, SbBottomButton, SbLink } from '../../components/ui';

// Hooks
import useInput from '../../hooks/useInput';

// Validators
import { isRequired, isLonger, isEmail } from '../../utils/validators';

// Theme
import theme from '../../theme';

const AuthScreen = () => {
  const login = useInput(isEmail);
  const password = useInput(isLonger.bind(null, 5));
  const name = useInput(isRequired);

  const [isLoginMode, setIsLoginMode] = useState(true);

  const isValid = isLoginMode
    ? login.isValid && password.isValid
    : login.isValid && password.isValid && name.isValid;

  const submitHandler = useCallback(() => {
    if (!isValid) {
      Alert.alert('Некорректная форма', 'Проверьте правильность заполнения полей формы', [
        { text: 'OK' },
      ]);
      return;
    }
    // Submit form and go to main page
    console.log('Submit form!');
    login.reset();
    password.reset();
    name.reset();
  }, [
    isValid,
    login.value,
    login.isValid,
    password.value,
    password.isValid,
    name.value,
    name.isValid,
  ]);

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
                errorText="Укажите пароль (более 5 символов)"
                value={password.value}
                hasError={password.hasError}
                onChangeHandler={password.onChangeText}
                onBlurHandler={password.onBlur}
                autoCapitalize="none"
                secureTextEntry
              />
              {isLoginMode ? (
                <SbLink style={styles.linkStyle} onPress={() => setIsLoginMode(false)}>
                  Нет аккаунта? Зарегистрироваться
                </SbLink>
              ) : (
                <SbLink style={styles.linkStyle} onPress={() => setIsLoginMode(true)}>
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

AuthScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Авторизация',
  };
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
