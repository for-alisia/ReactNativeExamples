import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

// Components
import { SbText, SbImage, SbStarRate, SbTitle, SbBottomButton, SbCard } from '../../components/ui';

// Icons
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

// Theme
import theme from '../../theme';

// Utils
import { getWordEndByQty } from '../../utils';

const ProductDetailScreen = (props) => {
  const productId = props.navigation.getParam('productId');

  const product = useSelector((state) =>
    // @ts-ignore
    state.products.availableProducts.find((product) => product.id === productId)
  );

  return (
    <View style={styles.wrapper}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <View style={styles.titleWrapper}>
              <SbTitle style={styles.title}>{product.title}</SbTitle>
            </View>
          </View>
          <View style={styles.imageContainer}>
            <SbCard>
              <SbImage source={product.imageUrl} style={styles.image} />
              <FontAwesome
                name="heart-o"
                size={32}
                color={theme.colors.primary}
                style={styles.iconHeart}
              />
            </SbCard>
          </View>
          <View style={styles.infoContainer}>
            <SbTitle style={styles.priceTitle}>{product.price} руб.</SbTitle>
            <View style={styles.rateContainer}>
              <SbStarRate
                color={theme.colors.yellow}
                rate={product.rate}
                style={styles.rateStars}
              />
              <SbText style={styles.reviewText}>
                {product.reviews.length} отзыв{getWordEndByQty(product.reviews.length)}
              </SbText>
            </View>
          </View>
          <View style={styles.descContainer}>
            <SbTitle style={styles.descTitle}>Описание</SbTitle>
            <SbText>{product.description}</SbText>
          </View>
        </View>
      </ScrollView>
      <SbBottomButton onPress={() => console.log('Add product to cart!')}>
        <View style={styles.addToCartButton}>
          <SbTitle style={styles.addToCartTitle}>В корзину</SbTitle>
          <MaterialIcons name="add-shopping-cart" size={20} color={theme.colors.light} />
        </View>
      </SbBottomButton>
    </View>
  );
};

ProductDetailScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam('productTitle'),
  };
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
  },
  titleContainer: {
    backgroundColor: theme.colors.secondaryLight,
    width: '100%',
    alignItems: 'center',
    paddingVertical: theme.padding.s,
    shadowColor: 'black',
    shadowOpacity: 0.16,
    shadowOffset: { width: 0, height: 2 },
  },
  titleWrapper: {
    width: '85%',
  },
  title: {
    textAlign: 'center',
  },
  imageContainer: {
    width: '90%',
    marginTop: theme.margin.xs * -1,
  },
  image: {
    height: 450,
  },
  iconHeart: {
    position: 'absolute',
    bottom: theme.margin.s,
    right: theme.margin.s,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: theme.padding.s,
    paddingHorizontal: theme.padding.l,
    marginTop: theme.margin.s,
  },
  rateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '43%',
  },
  priceTitle: {
    fontSize: 20,
  },
  reviewText: {
    color: theme.colors.primary,
  },
  rateStars: {
    marginTop: 2,
  },
  descContainer: {
    paddingHorizontal: theme.padding.l,
    paddingVertical: theme.padding.l,
  },
  descTitle: {
    marginBottom: theme.margin.m,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addToCartTitle: {
    color: theme.colors.light,
    fontFamily: theme.fonts.montserratReg,
    textTransform: 'uppercase',
    marginRight: theme.margin.s,
  },
});

export default ProductDetailScreen;
