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
  Account: {},
  HtmlTemplates: {},
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setCommonInfoTasks: (state, action) => {
      state.Tasks = action.payload;
    },
    setCommonInfoSequences: (state, action) => {
      state.Sequences = action.payload;
    },
    setStatistickInfo: (state, action) => {
      state.Tasks.Stats = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.Account = action.payload;
    },
    setCommonInfoHtmlTemplates: (state, action) => {
      state.HtmlTemplates = action.payload;
    },
  },
});

export const {
  setCommonInfoTasks,
  setStatistickInfo,
  setCommonInfoSequences,
  setCurrentUser,
  setCommonInfoHtmlTemplates,
} = commonSlice.actions;

export default commonSlice.reducer;
