import { createSlice } from "@reduxjs/toolkit";

const initialState = { currentPage: {}, status: {} };

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
      state.status[action.payload.filter] = "reset";
    },
    addFilterItem: (state, action) => {
      if (action.payload.value) {
        state[action.payload.filter][action.payload.item] =
          action.payload.value;
      } else {
        if (state[action.payload.filter]) {
          delete state[action.payload.filter][action.payload.item];
        }
      }
      state.status[action.payload.filter] = "event";
    },
    setCurrentPage: (state, action) => {
      state.currentPage[action.payload.filter] = action.payload.page;
      state.status[action.payload.filter] = "idle";
    },
  },
});

export const { checkFilter, resetFilter, addFilterItem, setCurrentPage } =
  b2bFilterSlice.actions;

export default b2bFilterSlice.reducer;
