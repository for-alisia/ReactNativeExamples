import React, { useState } from 'react';
import { View, Platform, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// Components
import SbImage from './SbImage';
import SbText from './SbText';
import SbButton from './SbButton';
import SbDoubleButton from './SbDoubleButton';

// Theme
import theme from '../../theme';

const SbImageSelector = () => {
  const [image, setImage] = useState(null);

  const getGalleryPermissions = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Отсутствие разрешений',
          'Пожалуйста, дайте разрешение на использование библиотеки устройства',
          [{ text: 'OK' }]
        );

        return false;
      }

      return true;
    }
  };

  const getCameraPermissions = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Отсутствие разрешений',
          'Пожалуйста, дайте разрешение на использование камеры устройства',
          [{ text: 'OK' }]
        );

        return false;
      }

      return true;
    }
  };

  const pickImageHandler = async () => {
    const hasPermission = await getGalleryPermissions();
    if (!hasPermission) return;
    const image = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!image.cancelled) {
      // @ts-ignore
      setImage(image.uri);
    }
  };

  const makePhotoHandler = async () => {
    const hasPermission = await getCameraPermissions();
    if (!hasPermission) return;
    const photo = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.5,
    });

    if (!photo.cancelled) {
      // @ts-ignore
      setImage(photo.uri);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.preview}>
        {!image && <SbText style={styles.text}>Изображение не выбрано</SbText>}
        <SbImage style={styles.image} source={image} />
      </View>
      <View style={styles.buttonContainer}>
        <SbDoubleButton
          leftLabel="Выбрать фото"
          rightLabel="Сделать фото"
          type="outline"
          onRightPress={makePhotoHandler}
          onLeftPress={pickImageHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  preview: {
    marginBottom: theme.margin.s,
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: theme.colors.secondary,
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text: {
    marginTop: theme.margin.m,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});

export default SbImageSelector;
