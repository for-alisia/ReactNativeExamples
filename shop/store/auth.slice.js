import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usersAPI } from '../fetchAPI';

let timer;

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
    unsetUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const userActions = userSlice.actions;

export const authenticateFromStore = (userData, expireTime) => async (dispatch) => {
  // TODO: very weird and bad logic with timers now => redo with refresh tokens
  setLogoutTimer(expireTime);
  dispatch(userActions.setUser(userData));
};

export const signup = (email, password, name) => async (dispatch) => {
  dispatch(userActions.startLoading());
  try {
    const userData = await usersAPI.signup(email, password);
    dispatch(userActions.setUser(userData));
    const expirationDate = new Date(new Date().getTime() + parseInt(userData.expiresIn) * 1000);
    saveDataToStorage(userData.idToken, userData.localId, expirationDate);
    setLogoutTimer(parseInt(userData.expiresIn) * 1000);
  } catch (err) {
    dispatch(userActions.setError(err.message));
  }
};

export const login = (email, password) => async (dispatch) => {
  dispatch(userActions.startLoading());
  try {
    const userData = await usersAPI.login(email, password);
    dispatch(userActions.setUser(userData));
    const expirationDate = new Date(new Date().getTime() + parseInt(userData.expiresIn) * 1000);
    saveDataToStorage(userData.idToken, userData.localId, expirationDate);
    setLogoutTimer(parseInt(userData.expiresIn) * 1000);
  } catch (err) {
    dispatch(userActions.setError(err.message));
  }
};

export const logout = () => async (dispatch) => {
  clearTimer();
  AsyncStorage.removeItem('userData');
  dispatch(userActions.unsetUser());
};

const clearTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = (expirationTime) => async (dispatch) => {
  timer = setTimeout(() => {
    dispatch(userActions.unsetUser());
  }, expirationTime);
};

const saveDataToStorage = (token, userId, expirationDate) => {
  console.log('Set user Data');
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({ token, userId, expireDate: expirationDate.toISOString() })
  );
};

export default userSlice.reducer;
