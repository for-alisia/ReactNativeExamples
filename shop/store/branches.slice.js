// @ts-nocheck
// Dependencies
import { createSlice } from '@reduxjs/toolkit';
import * as FileSystem from 'expo-file-system';
import getEnvVariables from '../env';

import { fetchAPI } from '../fetchAPI';

const initialState = {
  items: {},
  isLoading: false,
  error: null,
  wasCompleted: false,
};

const branchesSlice = createSlice({
  name: 'branches',
  initialState,
  reducers: {
    addBranch: (state, { payload }) => {
      state.items[payload.id] = {
        title: payload.title,
        description: payload.description,
        image: payload.image,
      };
      state.wasCompleted = true;
    },
    startLoading: (state) => {
      state.isLoading = true;
      state.error = null;
      state.wasCompleted = false;
    },
    setError: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
      state.wasCompleted = false;
    },
    setBranches: (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.items = payload;
    },
  },
});

export const branchesActions = branchesSlice.actions;

export const getBranches = () => async (dispatch) => {
  dispatch(branchesActions.startLoading());

  try {
    const branches = await fetchAPI.getData('branches');

    dispatch(branchesActions.setBranches(branches));
  } catch (err) {
    dispatch(branchesActions.setError(err));
  }
};

export const createBranch =
  ({ title, description, image, imageUri, location }) =>
  async (dispatch, getState) => {
    dispatch(branchesActions.startLoading());
    // Save file in the local storage
    try {
      const fileName = imageUri.split('/').pop();
      const newPath = FileSystem.documentDirectory + fileName;

      await FileSystem.moveAsync({
        from: imageUri,
        to: newPath,
      });
    } catch (err) {
      dispatch(branchesActions.setError(err));
    }

    // Get token and send request
    const token = getState().user.user && getState().user.user.idToken;
    const googleKey = getEnvVariables().googleApiKey;
    try {
      // TODO: this fetching should be on a map
      const addressResponse = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&language=ru&key=${googleKey}`
      );

      if (!addressResponse.ok) {
        throw new Error('Can not get an address');
      }

      const addressData = await addressResponse.json();

      if (!addressData.results) {
        throw new Error('Address results are not correct');
      }

      const address = addressData.results[0].formatted_address;
      console.log(address);

      const response = await fetchAPI.createData(
        'branches',
        { title, description, image, location, address },
        token
      );
      dispatch(branchesActions.addBranch(response));
    } catch (err) {
      dispatch(branchesActions.setError(err));
    }
  };

export default branchesSlice.reducer;
