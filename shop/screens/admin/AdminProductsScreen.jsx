import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, Platform, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

// Components
import { ProductItem } from '../../components/shop';
import { SbHeaderButton, SbIconContainer, SbLoading, SbError } from '../../components/ui';

// Theme
import theme from '../../theme';

// Actions
import { deleteProduct, fetchProducts } from '../../store/products.slice';

const AdminProductsScreen = ({ navigation }) => {
  // @ts-ignore
  const products = useSelector((state) => state.products.availableProducts);
  // @ts-ignore
  const isLoading = useSelector((state) => state.products.isLoading);
  // @ts-ignore
  const error = useSelector((state) => state.products.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Force to refetch products on each refresh
  useEffect(() => {
    const willFocusSub = navigation.addListener('willFocus', () => dispatch(fetchProducts()));

    return () => {
      willFocusSub.remove();
    };
  }, [dispatch]);

  const deleteHandler = (id) => {
    Alert.alert('Удаление продукта', 'Вы уверены, что хотите удалить продукт?', [
      { text: 'Отмена', style: 'default' },
      {
        text: 'Удалить',
        style: 'destructive',
        onPress: () => dispatch(deleteProduct(id)),
      },
    ]);
  };

  const editProductHandler = (id) => {
    navigation.navigate('EditProduct', { productId: id });
  };

  const renderItem = ({ item }) => {
    return (
      <ProductItem item={item} onSelect={editProductHandler.bind(null, item.id)}>
        <SbIconContainer onPress={deleteHandler.bind(null, item.id)} width={32} height={24}>
          <FontAwesome name="trash" size={24} color={theme.colors.primary} />
        </SbIconContainer>
        <SbIconContainer onPress={editProductHandler.bind(null, item.id)} width={32} height={24}>
          <MaterialIcons name="edit" size={24} color={theme.colors.primary} />
        </SbIconContainer>
      </ProductItem>
    );
  };

  if (isLoading) return <SbLoading color={theme.colors.primary} />;
  if (error)
    return (
      <SbError
        errorText={error}
        buttonText="Попробовать снова"
        buttonHandler={() => dispatch(fetchProducts())}
      />
    );
  return (
    <View style={styles.container}>
      <FlatList data={products} renderItem={renderItem} numColumns={2} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: theme.padding.s,
  },
});

export const screenOptions = (navData) => {
  return {
    headerTitle: 'Редактирование товаров',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={SbHeaderButton}>
        <Item
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          title="Меню"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={SbHeaderButton}>
        <Item
          iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          title="Добавить"
          onPress={() => {
            navData.navigation.navigate('EditProduct');
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default AdminProductsScreen;
