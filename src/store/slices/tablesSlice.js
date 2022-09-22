import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedIds: {},
};

export const tablesSlice = createSlice({
  name: "tablesSlice",
  initialState,
  reducers: {
    addSelectedId: (state, action) => {
      state.selectedIds[action.payload.table] =
        state.selectedIds[action.payload.table] || [];

      state.selectedIds[action.payload.table] = state.selectedIds[
        action.payload.table
      ].includes(action.payload.id)
        ? state.selectedIds[action.payload.table].filter(
            (id) => id !== action.payload.id
          )
        : [...state.selectedIds[action.payload.table], action.payload.id];
    },
    clearSelectedIds: (state, action) => {
      state.selectedIds[action.payload] = [];
    },
  },
});

export const { addSelectedId, clearSelectedIds } = tablesSlice.actions;

export default tablesSlice.reducer;
