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

  const userLocation = route.params.userLocation;

  const initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const mapRegion = userLocation
    ? {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
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
      headerRight: () => (
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
      <MapView region={mapRegion} style={styles.map} onPress={selectLocationHandler}>
        {location && <Marker title="Выбранная локация" coordinate={location}></Marker>}
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
