import { createSlice } from '@reduxjs/toolkit';
import { usersAPI } from '../fetchAPI';

const initialState = {
  user: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setError: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    setUser: (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.user = payload;
      state.isLoggedIn = true;
    },
  },
});

export const userActions = userSlice.actions;

export const signup = (email, password, name) => async (dispatch) => {
  dispatch(userActions.startLoading());
  try {
    const userData = await usersAPI.signup(email, password);
    dispatch(userActions.setUser(userData));
  } catch (err) {
    dispatch(userActions.setError(err.message));
  }
};

export const login = (email, password) => async (dispatch) => {
  dispatch(userActions.startLoading());
  try {
    const userData = await usersAPI.login(email, password);
    dispatch(userActions.setUser(userData));
  } catch (err) {
    dispatch(userActions.setError(err.message));
  }
};

export default userSlice.reducer;
