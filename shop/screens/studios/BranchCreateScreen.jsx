import React from 'react';
import { View, StyleSheet, Platform, ScrollView, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

// Components
import {
  SbText,
  SbHeading,
  SbLink,
  SbHeaderButton,
  SbInput,
  SbBottomButton,
  SbTitle,
} from '../../components/ui';

// Hooks
import useInput from '../../hooks/useInput';

// Actions
import { branchesActions } from '../../store/branches.slice';

// Theme
import theme from '../../theme';

// Utils
import { isRequired } from '../../utils/validators';

const BranchCreateSreen = ({ navigation }) => {
  const dispatch = useDispatch();
  // Create form's inputs
  const title = useInput(isRequired);
  const description = useInput(isRequired);

  const isValid = title.isValid && description.isValid;

  const submitHandler = () => {
    if (!isValid) {
      Alert.alert('Ошибка заполнения', 'Проверьте правильность заполнения формы', [{ text: 'OK' }]);
      return;
    }

    dispatch(branchesActions.addBranch({ title: title.value, description: description.value }));
    navigation.goBack();
  };

  return (
    <>
      <ScrollView>
        <View style={styles.screen}>
          <SbHeading>Новый филиал</SbHeading>
          <View style={styles.inputsContainer}>
            <SbInput
              label="Название филиала"
              errorText="Заполните название"
              value={title.value}
              onChangeHandler={title.onChangeText}
              onBlurHandler={title.onBlur}
              hasError={title.hasError}
            />
            <SbInput
              label="Описание"
              errorText="Заполните описание"
              value={description.value}
              onChangeHandler={description.onChangeText}
              onBlurHandler={description.onBlur}
              hasError={description.hasError}
              multiline
              numberOfLines={8}
            />
          </View>
        </View>
      </ScrollView>
      <SbBottomButton onPress={submitHandler}>
        <View style={styles.submitButton}>
          <SbTitle style={styles.buttonTitle}>Сохранить</SbTitle>
          <MaterialIcons name="save" size={20} color={theme.colors.light} />
        </View>
      </SbBottomButton>
    </>
  );
};

export const screenOptions = ({ navigation }) => {
  return {
    title: 'Создание филиала',
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: theme.padding.m,
  },
  inputsContainer: {},
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonTitle: {
    color: theme.colors.light,
    fontFamily: theme.fonts.montserratReg,
    textTransform: 'uppercase',
    marginRight: theme.margin.s,
  },
});

export default BranchCreateSreen;
