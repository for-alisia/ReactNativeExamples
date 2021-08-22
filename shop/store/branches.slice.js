// @ts-nocheck
// Dependencies
import { createSlice } from '@reduxjs/toolkit';

import { branchesAPI } from '../fetchAPI';

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
    const branches = await branchesAPI.getBranches();

    dispatch(branchesActions.setBranches(branches));
  } catch (err) {
    dispatch(branchesActions.setError(err));
  }
};

export const createBranch =
  ({ title, description, image }) =>
  async (dispatch, getState) => {
    dispatch(branchesActions.startLoading());
    const token = getState().user.user && getState().user.user.idToken;
    try {
      const response = await branchesAPI.createBranch({ title, description, image, token });
      dispatch(branchesActions.addBranch(response));
    } catch (err) {
      dispatch(branchesActions.setError(err));
    }
  };

export default branchesSlice.reducer;
