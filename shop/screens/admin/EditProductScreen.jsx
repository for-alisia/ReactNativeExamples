// @ts-nocheck
import React, { useEffect, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Platform, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// Components
import { SbBottomButton, SbTitle, SbHeaderButton, SbInput, SbLoading } from '../../components/ui';

// Theme
import theme from '../../theme';

// Actions
import { createProduct, updateProduct } from '../../store/products.slice';

// Validators
import { isLonger, isRequired } from '../../utils/validators';

// Hooks
import useInput from '../../hooks/useInput';

const EditProductScreen = ({ navigation, route }) => {
  const productId = route.params && route.params.productId;
  const product = useSelector(
    // @ts-ignore
    (state) => state.products.availableProducts.find((item) => item.id === productId)
  );
  // @ts-ignore
  const isLoading = useSelector((state) => state.products.isLoading);
  // @ts-ignore
  const error = useSelector((state) => state.products.error);
  // @ts-ignore
  const isSuccessed = useSelector((state) => state.products.isSuccessed);
  const dispatch = useDispatch();
  // Inputs
  const title = useInput(isLonger.bind(null, 5), product ? product.title : '');
  const imageUrl = useInput(isRequired, product ? product.imageUrl : '');
  const description = useInput(isLonger.bind(null, 10), product ? product.description : '');
  const price = useInput(isRequired, product ? product.price.toString() : '');

  const formIsValid = title.isValid && imageUrl.isValid && description.isValid && price.isValid;

  const submitHandler = useCallback(async () => {
    if (!formIsValid) {
      Alert.alert(
        'Проверьте данные',
        'Некоторые поля формы заполнены некорректно, проверьте данные и попробуйте снова',
        [{ text: 'OK' }]
      );
      return;
    }
    if (productId) {
      await dispatch(
        updateProduct({
          id: productId,
          title: title.value,
          description: description.value,
          imageUrl: imageUrl.value,
          price: price.value,
        })
      );
    } else {
      await dispatch(
        createProduct({
          title: title.value,
          description: description.value,
          imageUrl: imageUrl.value,
          price: price.value,
        })
      );
    }
  }, [productId, formIsValid, title.value, price.value, imageUrl.value, description.value]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={SbHeaderButton}>
          <Item
            iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
            title="Сохранить"
            onPress={submitHandler}
          />
        </HeaderButtons>
      ),
    });
  }, [submitHandler]);

  useEffect(() => {
    if (error) {
      Alert.alert('Произошла ошибка!', error, [{ text: 'OK' }]);
    }
  }, [error]);

  useEffect(() => {
    if (isSuccessed && !error) {
      navigation.goBack();
    }
  }, [error, isSuccessed]);

  if (isLoading) return <SbLoading color={theme.colors.primary} />;

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <SbInput
            value={title.value}
            errorText="Заголовок должен содержать не менее 5 символов"
            label="Наименование"
            onChangeHandler={title.onChangeText}
            onBlurHandler={title.onBlur}
            hasError={title.hasError}
          />
          <SbInput
            value={imageUrl.value}
            errorText="Ссылка не должна быть пустой"
            label="Ссылка на изображение"
            hasError={imageUrl.hasError}
            onBlurHandler={imageUrl.onBlur}
            onChangeHandler={imageUrl.onChangeText}
          />
          <SbInput
            value={description.value}
            errorText="Введите описание (не менее 10 символов)"
            label="Описание"
            multiline
            numberOfLines={8}
            hasError={description.hasError}
            onChangeHandler={description.onChangeText}
            onBlurHandler={description.onBlur}
          />
          <SbInput
            value={price.value}
            hasError={price.hasError}
            errorText="Введите цену"
            keyboardType="number-pad"
            label="Цена"
            onBlurHandler={price.onBlur}
            onChangeHandler={price.onChangeText}
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

export const screenOptions = ({ navigation, route }) => {
  return {
    headerTitle:
      route.params && route.params.productId ? 'Редактирование продукта' : 'Создание продукта',
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: theme.padding.m,
    paddingHorizontal: theme.padding.xl,
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

export default EditProductScreen;
