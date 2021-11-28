// @ts-nocheck
// Dependencies
import React, { useState, useEffect, useCallback } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, StyleSheet, Platform, Dimensions, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// Components
import { SbText, SbHeading, SbLink, SbHeaderButton } from '../../components/ui';

// Theme
import theme from '../../theme';

const BranchMapSreen = ({ navigation, route }) => {
  const [location, setLocation] = useState();

  const userLocation = route.params && route.params.userLocation ? route.params.userLocation : null;

  const readOnly = route.params && route.params.readOnly ? route.params.readOnly : false;
  const branchLocation = route.params && route.params.location ? route.params.location : null;
  const branchAddress = route.params && route.params.address ? route.params.address : null;

  const initialRegion = {
    latitude: 21.40338,
    longitude: 18.17403,
    latitudeDelta: 100,
    longitudeDelta: 100,
  };

  const mapRegion = userLocation
    ? {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    : initialRegion;

  const branchRegion = branchLocation
    ? {
        latitude: branchLocation.latitude,
        longitude: branchLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    : initialRegion;

  const selectLocationHandler = ({ nativeEvent: { coordinate } }) => {
    setLocation(coordinate);
  };

  const saveLocationHandler = useCallback(() => {
    if (!location) {
      Alert.alert(
        'Выберите место на карте',
        'Перед сохранением вы должны выбрать локацию на карте',
        [{ text: 'OK' }]
      );

      return;
    }
    navigation.navigate('BranchCreate', { pickedLocation: location });
  }, [location]);

  useEffect(() => {
    navigation.setOptions({
      title: readOnly ? branchAddress : 'Выберите место на карте',
      headerRight: readOnly
        ? () => {}
        : () => (
            <HeaderButtons HeaderButtonComponent={SbHeaderButton}>
              <Item
                iconName={Platform.OS === 'android' ? 'md-save' : 'ios-save'}
                title="Выбрать"
                onPress={saveLocationHandler}
              />
            </HeaderButtons>
          ),
    });
  }, [saveLocationHandler]);

  return (
    <View style={styles.container}>
      <MapView
        region={readOnly ? branchRegion : mapRegion}
        style={styles.map}
        onPress={readOnly ? () => {} : selectLocationHandler}
      >
        {!readOnly && location && <Marker title="Выбранная локация" coordinate={location}></Marker>}
        {readOnly && <Marker title={branchAddress} coordinate={branchLocation}></Marker>}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export const screenOptions = () => {
  return {
    title: 'Выберите место на карте',
  };
};

export default BranchMapSreen;
