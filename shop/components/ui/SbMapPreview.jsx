import React from 'react';
import { StyleSheet } from 'react-native';
import ENV from '../../env';
import { helpers } from '../../helpers/helperFunctions';

import SbImage from './SbImage';
import SbText from './SbText';

const apiKey = ENV().googleApiKey;

const SbMapPreview = ({ location }) => {
  return (
    <>
      {location ? (
        <SbImage
          style={{ height: 200 }}
          source={helpers.getMapStaticUrl(location.latitude, location.longitude, apiKey)}
        />
      ) : (
        <SbText>Место не выбрано</SbText>
      )}
    </>
  );
};

const styles = StyleSheet.create({});

export default SbMapPreview;
