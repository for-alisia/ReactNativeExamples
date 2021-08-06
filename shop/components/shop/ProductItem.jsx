// Dependencies
import React from 'react';
import { StyleSheet, View } from 'react-native';

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
        <SbTouchable onPress={onViewDetail} activeOpacity={theme.activeOpacity}>
          <View>
            <SbImage source={item.imageUrl} style={styles.image} />
            <View style={styles.description}>
              <View style={styles.priceRow}>
                <SbTitle style={styles.price}>{item.price} руб.</SbTitle>
                <SbTouchable onPress={onAddToFavorite}>
                  <View style={styles.iconContainer}>
                    <FontAwesome name="heart-o" size={24} color={theme.colors.primary} />
                  </View>
                </SbTouchable>
                <SbTouchable onPress={onAddToCart}>
                  <View style={styles.iconContainer}>
                    <MaterialIcons
                      name="add-shopping-cart"
                      size={24}
                      color={theme.colors.primary}
                    />
                  </View>
                </SbTouchable>
              </View>
              <SbText style={styles.title}>{item.title}</SbText>
              <SbStarRate color={theme.colors.yellow} rate={item.rate} />
            </View>
          </View>
        </SbTouchable>
      </SbCard>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.padding.xs,
    width: '50%',
    flex: 1,
    overflow: 'hidden',
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
  title: {
    fontSize: theme.fontSize.xs,
    fontFamily: theme.fonts.monserratBold,
    marginBottom: theme.margin.s,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 32,
    height: 24,
  },
});

export default ProductItem;
