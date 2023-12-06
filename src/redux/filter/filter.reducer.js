import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filter: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,

  reducers: {
    addToFilter(state, { payload }) {
      state.filter = payload;
    },
  },
});

export const { addToFilter } = filterSlice.actions;

export const filterReducer = filterSlice.reducer;
