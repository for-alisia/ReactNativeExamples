// @ts-nocheck
// Dependencies
import React, { useState } from 'react';
import { View, StyleSheet, Alert, Platform } from 'react-native';
import * as Location from 'expo-location';

// Components
import SbImage from './SbImage';
import SbText from './SbText';
import SbButton from './SbButton';
import SbLoading from './SbLoading';
import SbMapPreview from './SbMapPreview';

// Theme
import theme from '../../theme';

const SbLocationPicker = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pickedLocation, setPickedLocation] = useState();

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
  return (
    <View style={styles.container}>
      <View style={styles.labelWrapper}>
        <SbText style={styles.label}>Геолокация:</SbText>
      </View>
      <View style={styles.preview}>
        {isLoading ? <SbLoading /> : <SbMapPreview location={pickedLocation} />}
      </View>
      <View style={styles.buttonContainer}>
        <SbButton type="outline" onPress={getLocationHandler}>
          Выбрать место
        </SbButton>
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
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});

export default SbLocationPicker;
