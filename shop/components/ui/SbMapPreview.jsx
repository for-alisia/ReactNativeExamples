import React from 'react';
import { View, StyleSheet } from 'react-native';
import { mapKey } from '../../env';

import SbImage from './SbImage';
import SbText from './SbText';

import theme from '../../theme';

const SbMapPreview = ({ location }) => {
  const getUrlForMap = (lat, long) =>
    `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:C%7C${lat},${long}&key=${mapKey}`;

  if (location) {
    console.log(getUrlForMap(location.lat, location.long));
  }

  return (
    <>
      {location ? (
        <SbImage source={getUrlForMap(location.lat, location.long)} />
      ) : (
        <SbText>Место не выбрано</SbText>
      )}
    </>
  );
};

const styles = StyleSheet.create({});

export default SbMapPreview;
