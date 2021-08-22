import React from 'react';
import { View, StyleSheet } from 'react-native';

// Components
import { SbCard, SbTitle, SbText, SbTouchable, SbImage } from '../ui';

// Theme
import theme from '../../theme';

const BranchItem = ({ item, onSelect }) => {
  return (
    <SbCard style={styles.card}>
      <SbTouchable onPress={onSelect}>
        <View style={styles.branchWrapper}>
          <View style={styles.imageWrapper}>
            <SbImage source={item.image} style={styles.image} base64={true} />
          </View>
          <View style={styles.dataWrapper}>
            <SbTitle>{item.title}</SbTitle>
            <SbText>{item.description}</SbText>
          </View>
        </View>
      </SbTouchable>
    </SbCard>
  );
};

const styles = StyleSheet.create({
  branchWrapper: {
    flexDirection: 'row',
  },
  card: {
    marginBottom: theme.margin.s,
  },
  imageWrapper: {
    width: '30%',
  },
  image: {
    height: '100%',
    minHeight: 120,
  },
  dataWrapper: {
    paddingHorizontal: theme.padding.m,
    paddingVertical: theme.padding.s,
  },
});

export default BranchItem;
