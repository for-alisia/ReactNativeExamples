// @ts-nocheck
// Dependencies
import { createSlice } from '@reduxjs/toolkit';

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
      const id = new Date().toISOString();
      state.items[id] = {
        title: payload.title,
        description: payload.description,
      };
    },
  },
});

export const branchesActions = branchesSlice.actions;

export default branchesSlice.reducer;
