import React from 'react';
import { View, StyleSheet, Platform, ScrollView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';

// Components
import { SbText, SbHeading, SbImage, SbMapPreview, SbTouchable } from '../../components/ui';

// Theme
import theme from '../../theme';

const BranchDetailSreen = ({ navigation, route }) => {
  const branchId = route.params.branchId;

  const branch = useSelector((state) => {
    // @ts-ignore
    const branch = state.branches.items[branchId];
    return { ...branch, id: branchId };
  });

  const showMapHandler = () => {
    navigation.navigate('BranchMap', {
      readOnly: true,
      location: branch.location,
      address: branch.address,
    });
  };

  return (
    <ScrollView style={styles.screen}>
      <SbHeading>{branch.title}</SbHeading>
      <SbImage source={branch.image} style={styles.image} base64 />
      <SbText>{branch.description}</SbText>
      <SbText>{branch.address}</SbText>
      <SbTouchable onPress={showMapHandler}>
        <View style={styles.preview}>
          <SbMapPreview location={branch.location} />
        </View>
      </SbTouchable>
    </ScrollView>
  );
};

export const screenOptions = ({ navigation, route }) => {
  return {
    title: route.params.branchTitle,
  };
};

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: theme.padding.m,
  },
  preview: {
    marginBottom: theme.margin.s,
    width: '100%',
    height: 230,
    borderStyle: 'solid',
    borderColor: theme.colors.accentDark,
    borderWidth: 1,
  },
  image: {
    height: 230,
  },
});

export default BranchDetailSreen;
