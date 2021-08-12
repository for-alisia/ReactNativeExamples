// @ts-nocheck
import React, { useEffect, useCallback, useState } from 'react';
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

const EditProductScreen = ({ navigation }) => {
  const productId = navigation.getParam('productId');
  const product = useSelector(
    // @ts-ignore
    (state) => state.products.availableProducts.find((item) => item.id === productId)
  );
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
    setIsLoading(true);
    setError(null);
    try {
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
      navigation.goBack();
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  }, [productId, formIsValid, title.value, price.value, imageUrl.value, description.value]);

  useEffect(() => {
    navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  useEffect(() => {
    if (error) {
      Alert.alert('Ошибка!', error, [{ text: 'OK' }]);
    }
  }, [error]);

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

EditProductScreen.navigationOptions = (navData) => {
  const submitHandler = navData.navigation.getParam('submit');
  return {
    headerTitle: navData.navigation.getParam('productId')
      ? 'Редактирование продукта'
      : 'Создание продукта',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={SbHeaderButton}>
        <Item
          iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
          title="Сохранить"
          onPress={submitHandler}
        />
      </HeaderButtons>
    ),
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
