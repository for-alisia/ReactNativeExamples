import React, { useEffect, useCallback, useReducer } from 'react';
import { View, StyleSheet, TextInput, ScrollView, Platform, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// Components
import { SbText, SbBottomButton, SbTitle, SbHeaderButton, SbInput } from '../../components/ui';

// Theme
import theme from '../../theme';

// Actions
import { productActions } from '../../store/products.slice';

const UPDATE = 'UPDATE';

const formReducer = (state, { type, payload }) => {
  if (type === UPDATE) {
    const updatedValues = { ...state.inputValues, [payload.input]: payload.value };
    const updatedValidities = { ...state.inputValidities, [payload.input]: payload.isValid };
    let isValid = true;
    for (let input in updatedValidities) {
      if (!updatedValidities[input]) {
        isValid = false;
      }
    }
    return {
      inputValues: updatedValues,
      inputValidities: updatedValidities,
      formIsValid: isValid,
    };
  }

  return state;
};

const EditProductScreen = ({ navigation }) => {
  const productId = navigation.getParam('productId');
  const product = useSelector(
    // @ts-ignore
    (state) => state.products.availableProducts.find((item) => item.id === productId)
  );
  const dispatch = useDispatch();
  const [form, dispatchForm] = useReducer(formReducer, {
    inputValues: {
      title: product ? product.title : '',
      imageUrl: product ? product.imageUrl : '',
      description: product ? product.description : '',
      price: product ? product.price.toString() : '',
    },
    inputValidities: {
      title: product ? true : false,
      imageUrl: product ? true : false,
      description: product ? true : false,
      price: product ? true : false,
    },
    formIsValid: product ? true : false,
  });

  const submitHandler = useCallback(() => {
    if (!form.formIsValid) {
      Alert.alert(
        'Проверьте данные',
        'Некоторые поля формы заполнены некорректно, проверьте данные и попробуйте снова',
        [{ text: 'OK' }]
      );
      return;
    }
    const { title, imageUrl, description, price } = form.inputValues;
    if (productId) {
      dispatch(
        productActions.updateProduct({ id: productId, title, description, imageUrl, price })
      );
    } else {
      dispatch(productActions.createProduct({ title, description, imageUrl, price }));
    }
    navigation.goBack();
  }, [
    productId,
    form.inputValues.title,
    form.inputValues.description,
    form.inputValues.imageUrl,
    form.inputValues.price,
  ]);

  useEffect(() => {
    navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const textChangeHandler = (input, text) => {
    // @ts-ignore
    dispatchForm({
      type: UPDATE,
      payload: { value: text, isValid: text.trim().length > 3, input },
    });
  };

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <SbInput
            value={form.inputValues.title}
            isValid={form.inputValidities.title}
            errorText="Заголовок должен содержать не менее 3 символов"
            onChangeText={textChangeHandler.bind(null, 'title')}
          />
          <SbInput
            value={form.inputValues.imageUrl}
            isValid={form.inputValidities.imageUrl}
            errorText="Ссылка не должна быть пустой"
            onChangeText={textChangeHandler.bind(null, 'imageUrl')}
          />
          <SbInput
            value={form.inputValues.description}
            isValid={form.inputValidities.description}
            errorText="Введите описание"
            onChangeText={textChangeHandler.bind(null, 'description')}
          />
          <SbInput
            value={form.inputValues.price}
            isValid={form.inputValidities.price}
            errorText="Введите цену"
            onChangeText={textChangeHandler.bind(null, 'price')}
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
