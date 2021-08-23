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

const SbImageSelector = ({ onImageTaken }) => {
  const [image, setImage] = useState(null);

  const getPermissions = async (type) => {
    if (Platform.OS !== 'web') {
      const { status } =
        type === 'galery'
          ? await ImagePicker.requestMediaLibraryPermissionsAsync()
          : await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Отсутствие разрешений',
          `Пожалуйста, дайте разрешение на использование ${
            type === 'galery' ? 'библиотеки' : 'камеры'
          } устройства`,
          [{ text: 'OK' }]
        );

        return false;
      }

      return true;
    }
  };

  const pickPhotoHandler = async (type) => {
    const hasPermission = await getPermissions(type);

    if (!hasPermission) return;
    let photo;
    if (type === 'galery') {
      photo = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        base64: true,
      });
    } else {
      photo = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.5,
        base64: true,
      });
    }

    if (!photo.cancelled) {
      // @ts-ignore
      setImage(photo.base64);
      onImageTaken(photo.base64, photo.uri);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.labelWrapper}>
        <SbText style={styles.label}>Изображение:</SbText>
      </View>
      <View style={{ ...styles.preview, height: image ? 230 : 10 }}>
        <SbImage style={styles.image} source={image} base64={true} />
      </View>
      <View style={styles.buttonContainer}>
        <SbDoubleButton
          leftLabel="Выбрать фото"
          rightLabel="Сделать фото"
          type="outline"
          onRightPress={pickPhotoHandler.bind(null, 'camera')}
          onLeftPress={pickPhotoHandler.bind(null, 'galery')}
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
    height: 230,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text: {
    marginTop: theme.margin.m,
    fontSize: theme.fontSize.xs,
    color: theme.colors.accent,
    width: '100%',
  },
  label: {
    fontFamily: theme.fonts.playfair,
  },
  labelWrapper: {
    width: '100%',
    marginBottom: theme.margin.s,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});

export default SbImageSelector;
