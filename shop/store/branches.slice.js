// @ts-nocheck
// Dependencies
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
  wasCompleted: false,
};

const branchesSlice = createSlice({
  name: 'branches',
  initialState,
  reducers: {
    addBranch: (state, { payload }) => {
      state.items.push(payload);
    },
  },
});

export const branchesActions = branchesSlice.actions;

export default branchesSlice.reducer;
