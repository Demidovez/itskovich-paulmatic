import { createSlice } from "@reduxjs/toolkit";

const initialState = { currentPage: {}, status: {}, search: {} };

export const b2bFilterSlice = createSlice({
  name: "b2bFilter",
  initialState,
  reducers: {
    checkFilter: (state, action) => {
      if (!state[action.payload.filter]) {
        state[action.payload.filter] = {};
        state.status[action.payload.filter] = "init";
      }
    },
    resetFilter: (state, action) => {
      state[action.payload] = {};
      state.status[action.payload] = "reset";
    },
    addFilterItem: (state, action) => {
      if (action.payload.value) {
        state[action.payload.filter][action.payload.item] =
          action.payload.value;

        // console.log("addFilterItem");
        state.status[action.payload.filter] = "event";

        if (action.payload.dependValue) {
          delete state[action.payload.filter][action.payload.dependValue];
        }
      } else {
        if (state[action.payload.filter]) {
          delete state[action.payload.filter][action.payload.item];
        }
      }
    },
    setCurrentPage: (state, action) => {
      state.currentPage[action.payload.filter] = action.payload.page;
      state.status[action.payload.filter] = "idle";
    },
    setSearchValue: (state, action) => {
      state.search[action.payload.filter] = action.payload.search;
      state.status[action.payload.filter] = "event";
      // console.log("setSearchValue ");
    },
  },
});

export const {
  checkFilter,
  resetFilter,
  addFilterItem,
  setCurrentPage,
  setSearchValue,
} = b2bFilterSlice.actions;

export default b2bFilterSlice.reducer;
