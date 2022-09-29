import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  interval: 15,
  Tasks: {
    Statuses: [],
    Types: {},
    Stats: {
      All: null,
      ByType: {},
      ByStatus: {},
    },
  },
  Sequences: {},
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setCommonInfo: (state, action) => {
      state.Tasks = action.payload.Tasks;
      state.Sequences = action.payload.Sequences;
    },
  },
});

export const { setCommonInfo } = commonSlice.actions;

export default commonSlice.reducer;
