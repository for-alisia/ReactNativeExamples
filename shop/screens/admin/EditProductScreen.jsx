import React, { useState } from 'react';
import { View, StyleSheet, TextInput, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';

// Components
import { SbText, SbBottomButton, SbTitle } from '../../components/ui';

// Theme
import theme from '../../theme';

// Actions

const EditProductScreen = ({ navigation }) => {
  const productId = navigation.getParam('productId');
  const product = useSelector(
    // @ts-ignore
    (state) => state.products.availableProducts.find((item) => item.id === productId)
  );
  const [title, setTitle] = useState(product ? product.title : '');
  const [imageURL, setImageURL] = useState(product ? product.imageUrl : '');
  const [description, setDescription] = useState(product ? product.description : '');
  const [price, setPrice] = useState(product ? product.price.toString() : '');

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.formControl}>
            <SbText style={styles.label}>Наименование:</SbText>
            <TextInput style={styles.input} value={title} onChangeText={(text) => setTitle(text)} />
          </View>
          <View style={styles.formControl}>
            <SbText style={styles.label}>Картинка (URL):</SbText>
            <TextInput
              style={styles.input}
              value={imageURL}
              onChangeText={(text) => setImageURL(text)}
            />
          </View>
          <View style={styles.formControl}>
            <SbText style={styles.label}>Описание:</SbText>
            <TextInput
              style={styles.input}
              value={description}
              onChangeText={(text) => setDescription(text)}
            />
          </View>
          <View style={styles.formControl}>
            <SbText style={styles.label}>Цена:</SbText>
            <TextInput style={styles.input} value={price} onChangeText={(text) => setPrice(text)} />
          </View>
        </View>
      </ScrollView>
      <SbBottomButton
        onPress={() => {
          console.log('Save product!');
        }}
      >
        <View style={styles.submitButton}>
          <SbTitle style={styles.buttonTitle}>Сохранить</SbTitle>
          <MaterialIcons name="save" size={20} color={theme.colors.light} />
        </View>
      </SbBottomButton>
    </>
  );
};

EditProductScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam('productId')
      ? 'Редактирование продукта'
      : 'Создание продукта',
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: theme.padding.m,
    paddingHorizontal: theme.padding.xl,
  },
  formControl: {
    width: '100%',
    marginVertical: theme.margin.m,
  },
  label: {},
  input: {
    paddingHorizontal: theme.padding.xs,
    borderBottomWidth: 1,
    borderColor: theme.colors.secondary,
    height: 40,
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
