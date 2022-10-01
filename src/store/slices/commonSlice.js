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
    setStatistickInfo: (state, action) => {
      state.Tasks.Stats = action.payload;
    },
  },
});

export const { setCommonInfo, setStatistickInfo } = commonSlice.actions;

export default commonSlice.reducer;
