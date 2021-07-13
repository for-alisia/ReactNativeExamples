// Dependencies
import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

// Components
import { SbText, SbTitle, SbCard, SbStarRate, SbImage, SbTouchable } from '../ui';

// Icons
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

// Theme
import theme from '../../theme';

const ProductItem = ({ item, onViewDetail, onAddToFavorite, onAddToCart }) => {
  return (
    <View style={styles.container}>
      <SbCard>
        <TouchableOpacity onPress={onViewDetail} activeOpacity={theme.activeOpacity}>
          <SbImage source={item.imageUrl} style={styles.image} />
          <View style={styles.description}>
            <View style={styles.priceRow}>
              <SbTitle style={styles.price}>{item.price} руб.</SbTitle>
              <SbTouchable onPress={onAddToFavorite}>
                <FontAwesome
                  name="heart-o"
                  size={24}
                  color={theme.colors.primary}
                  style={styles.icons}
                />
              </SbTouchable>
              <SbTouchable onPress={onAddToCart}>
                <MaterialIcons name="add-shopping-cart" size={24} color={theme.colors.primary} />
              </SbTouchable>
            </View>
            <SbText style={styles.title}>{item.title}</SbText>
            <SbStarRate color={theme.colors.yellow} rate={item.rate} />
          </View>
        </TouchableOpacity>
      </SbCard>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.padding.xs,
    width: '50%',
    flex: 1,
  },
  // Set image height
  image: {
    height: 220,
  },
  // Whole description block
  description: {
    paddingHorizontal: theme.padding.s,
    paddingVertical: theme.padding.xs,
  },
  // First row with price and icons
  priceRow: {
    flexDirection: 'row',
  },
  price: {
    flexGrow: 1,
  },
  icons: {
    marginRight: theme.margin.s,
  },
  title: {
    fontSize: theme.fontSize.xs,
    fontFamily: theme.fonts.monserratBold,
    marginBottom: theme.margin.s,
  },
});

export default ProductItem;
