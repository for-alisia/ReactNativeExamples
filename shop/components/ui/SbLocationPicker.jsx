// @ts-nocheck
// Dependencies
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Platform } from 'react-native';
import * as Location from 'expo-location';

// Components
import SbText from './SbText';
import SbLoading from './SbLoading';
import SbMapPreview from './SbMapPreview';
import SbDoubleButton from './SbDoubleButton';
import SbTouchable from './SbTouchable';

// Theme
import theme from '../../theme';

const SbLocationPicker = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [pickedLocation, setPickedLocation] = useState();

  const mapPickedLocation = route.params ? route.params.pickedLocation : null;

  useEffect(() => {
    if (mapPickedLocation) {
      setPickedLocation({ lat: mapPickedLocation.latitude, long: mapPickedLocation.longitude });
    }
  }, [mapPickedLocation]);

  const getPermissions = async () => {
    if (Platform.OS !== 'web') {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Отсутствие разрешений',
          `Пожалуйста, дайте разрешение на использование геолокации устройства`,
          [{ text: 'OK' }]
        );

        return false;
      }

      return true;
    }
  };

  const defineUserLocation = async () => {
    if (Platform.OS !== 'web') {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return false;
      }
    }

    let { coords } = await Location.getCurrentPositionAsync({});

    return coords;
  };

  const getLocationHandler = async () => {
    const hasPermissions = await getPermissions();

    if (!hasPermissions) {
      return;
    }
    setIsLoading(true);
    try {
      let {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({});
      setPickedLocation({
        lat: latitude,
        long: longitude,
      });
    } catch (err) {
      Alert.alert(
        'Ошибка при определении места',
        'Невозможно определить геолокацию. Попробуйте позже или выберите место на карте вручную',
        [{ text: 'OK' }]
      );
    }

    setIsLoading(false);
  };

  const pickOnMapHandler = async () => {
    const userLocation = await defineUserLocation();
    navigation.navigate('BranchMap', { userLocation });
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelWrapper}>
        <SbText style={styles.label}>Геолокация:</SbText>
      </View>
      <SbTouchable onPress={pickOnMapHandler}>
        <View style={styles.preview}>
          {isLoading ? <SbLoading /> : <SbMapPreview location={pickedLocation} />}
        </View>
      </SbTouchable>
      <View style={styles.buttonContainer}>
        <SbDoubleButton
          leftLabel="Мое положение"
          rightLabel="Выбрать на карте"
          type="outline"
          onRightPress={pickOnMapHandler}
          onLeftPress={getLocationHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  labelWrapper: {
    width: '100%',
    marginBottom: theme.margin.s,
  },
  label: {
    fontFamily: theme.fonts.playfair,
  },
  preview: {
    marginBottom: theme.margin.s,
    width: '100%',
    height: 230,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    borderColor: theme.colors.accentDark,
    borderWidth: 1,
    overflow: 'hidden',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: theme.margin.m,
  },
});

export default SbLocationPicker;
