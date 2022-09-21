import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const b2bFilterSlice = createSlice({
  name: "b2bFilter",
  initialState,
  reducers: {
    checkFilter: (state, action) => {
      if (!state[action.payload]) {
        state[action.payload] = {};
      }
    },
    resetFilter: (state, action) => {
      state[action.payload] = {};
    },
    addFilterItem: (state, action) => {
      if (action.payload.value) {
        state[action.payload.filter][action.payload.item] =
          action.payload.value;
      } else {
        delete state[action.payload.filter][action.payload.item];
      }
    },
  },
});

export const { checkFilter, resetFilter, addFilterItem } =
  b2bFilterSlice.actions;

export default b2bFilterSlice.reducer;
