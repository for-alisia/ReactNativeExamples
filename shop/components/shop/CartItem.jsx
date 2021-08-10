import React from 'react';
import { View, StyleSheet } from 'react-native';

// Components
import { SbText, SbCard, SbImage, SbTouchable, SbQtyControl, SbIconContainer } from '../ui';

// Icons
import { FontAwesome } from '@expo/vector-icons';

// Theme
import theme from '../../theme';

const CartItem = ({ item, onViewDetail, onDeleteItem, onAddItem, onSubstractItem }) => {
  return (
    <SbTouchable onPress={onViewDetail}>
      <View style={styles.container}>
        <SbCard style={styles.card}>
          <View style={styles.imageContainer}>
            <SbImage source={item.imageUrl} style={styles.image} />
          </View>
          <View style={styles.detailsContainer}>
            <SbText style={styles.cardTitle}>{item.title}</SbText>
            <View style={styles.row}>
              <SbText>Количество:</SbText>
              <View>
                <SbQtyControl qty={item.quantity} onAdd={onAddItem} onSubstract={onSubstractItem} />
              </View>
            </View>
            <View style={styles.row}>
              <SbText>Цена:</SbText>
              <SbText>{item.price} руб.</SbText>
            </View>
            <View style={styles.row}>
              <SbText>Всего:</SbText>
              <SbText style={styles.bolded}>{item.sum} руб.</SbText>
              <SbIconContainer onPress={onDeleteItem} width={30} height={30}>
                <FontAwesome name="trash" size={26} color={theme.colors.primary} />
              </SbIconContainer>
            </View>
          </View>
        </SbCard>
      </View>
    </SbTouchable>
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
    height: 160,
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
  bolded: {
    fontFamily: theme.fonts.monserratBold,
  },
});

export default CartItem;
