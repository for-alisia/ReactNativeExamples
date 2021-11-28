import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

// Components
import {
  SbHeading,
  SbInput,
  SbBottomButton,
  SbTitle,
  SbImageSelector,
  SbLoading,
  SbError,
  SbLocationPicker,
} from '../../components/ui';

// Hooks
import useInput from '../../hooks/useInput';

// Actions
import { createBranch } from '../../store/branches.slice';

// Theme
import theme from '../../theme';

// Utils
import { isRequired } from '../../utils/validators';

const BranchCreateSreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  // @ts-ignore
  const isLoading = useSelector((state) => state.branches.isLoading);
  // @ts-ignore
  const error = useSelector((state) => state.branches.error);
  // @ts-ignore
  const wasCompleted = useSelector((state) => state.branches.wasCompleted);
  // Create form's inputs
  const title = useInput(isRequired);
  const description = useInput(isRequired);

  const mapPickedLocation = route.params ? route.params.pickedLocation : null;

  // Set selected image
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [location, setLocation] = useState(null);

  const isValid = title.isValid && description.isValid;

  const submitHandler = () => {
    if (!isValid) {
      Alert.alert('Ошибка заполнения', 'Проверьте правильность заполнения формы', [{ text: 'OK' }]);
      return;
    }

    dispatch(
      createBranch({
        title: title.value,
        description: description.value,
        image: selectedImage,
        imageUri,
        location,
      })
    );
  };

  useEffect(() => {
    if (wasCompleted) {
      navigation.goBack();
    }
  }, [wasCompleted]);

  useEffect(() => {
    if (mapPickedLocation) {
      setLocation(mapPickedLocation);
    }
  }, [mapPickedLocation]);

  useEffect(() => {
    if (error) {
      Alert.alert('Ошибка сохранения', 'Что-то пошло не так, попробуйте еще раз', [{ text: 'OK' }]);
    }
  }, [error]);

  const imagePickHandler = (image, imageUri) => {
    setSelectedImage(image);
    setImageUri(imageUri);
  };

  const locationPickHandler = useCallback(
    (location) => {
      setLocation(location);
    },
    [setLocation]
  );

  if (isLoading) return <SbLoading color={theme.colors.primary} />;

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
          <SbImageSelector onImageTaken={imagePickHandler} />
          <SbLocationPicker
            navigation={navigation}
            route={route}
            onLocationPicked={locationPickHandler}
            location={location}
          />
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
  inputsContainer: {
    marginBottom: theme.margin.l,
  },
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
