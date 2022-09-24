import { createSlice } from "@reduxjs/toolkit";

const initialState = { currentPage: {}, status: {}, search: {} };

export const b2bFilterSlice = createSlice({
  name: "b2bFilter",
  initialState,
  reducers: {
    checkFilters: (state, action) => {
      action.payload.names.map((name) => {
        if (!state[name]) {
          state[name] = {};
          state.status[name] = "init";
        }
      });
    },
    resetFilter: (state, action) => {
      state[action.payload] = {};
      state.status[action.payload] = "reset";
    },
    addFilterItem: (state, action) => {
      if (action.payload.value) {
        state[action.payload.filter][action.payload.item] =
          action.payload.value;

        state.status[action.payload.filter] = "event";
      } else {
        if (state[action.payload.filter]) {
          delete state[action.payload.filter][action.payload.item];
          state.status[action.payload.filter] = "event";
        }
      }

      if (action.payload.dependValue) {
        delete state[action.payload.filter][action.payload.dependValue];
      }
    },
    setCurrentPage: (state, action) => {
      state.currentPage[action.payload.filter] = action.payload.page;
      state.status[action.payload.filter] = "idle";
    },
    setSearchValue: (state, action) => {
      state.search[action.payload.filter] = action.payload.search;
      state.status[action.payload.filter] = "event";
    },
  },
});

export const {
  checkFilters,
  resetFilter,
  addFilterItem,
  setCurrentPage,
  setSearchValue,
} = b2bFilterSlice.actions;

export default b2bFilterSlice.reducer;
