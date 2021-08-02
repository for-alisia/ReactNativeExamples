import React from 'react';
import { View, StyleSheet } from 'react-native';

// Components
import { SbText, SbCard, SbImage, SbTouchable } from '../ui';

// Icons
import { FontAwesome } from '@expo/vector-icons';

// Theme
import theme from '../../theme';

const CartItem = ({ item, navigation }) => {
  console.log(item);
  return (
    <View style={styles.container}>
      <SbCard style={styles.card}>
        <View style={styles.imageContainer}>
          <SbImage source={item.image} style={styles.image} />
        </View>
        <View style={styles.detailsContainer}>
          <SbText style={styles.cardTitle}>{item.productTitle}</SbText>
          <View style={styles.row}>
            <SbText>Количество:</SbText>
            <View style={styles.range}>
              <SbText>{item.quantity}</SbText>
            </View>
          </View>
          <View style={styles.row}>
            <SbText>Цена:</SbText>
            <SbText>{item.productPrice} руб.</SbText>
          </View>
          <View style={styles.row}>
            <SbText>Всего:</SbText>
            <SbText style={styles.bolded}>{item.sum} руб.</SbText>
            <SbTouchable
              onPress={() => {
                console.log('Delete item from cart');
              }}
            >
              <FontAwesome name="trash" size={26} color={theme.colors.primary} />
            </SbTouchable>
          </View>
        </View>
      </SbCard>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.margin.s,
  },

  card: {
    flexDirection: 'row',
  },
  imageContainer: {
    width: '30%',
  },
  image: {
    height: 150,
  },
  detailsContainer: {
    padding: theme.padding.s,
    width: '70%',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: theme.fontSize.s,
    marginBottom: theme.margin.m,
    fontFamily: theme.fonts.monserratBold,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  range: {},
  bolded: {
    fontFamily: theme.fonts.monserratBold,
  },
});

export default CartItem;
