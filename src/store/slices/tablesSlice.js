import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedIds: {},
  activeTable: "companies",
  tables: {
    companies: {},
    persons: {},
  },
  cache: {},
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
    addTables: (state, action) => {
      action.payload.map((table) => {
        state.tables[table.table] = table.data;
      });
    },
    setActiveTable: (state, action) => {
      state.activeTable = action.payload;
    },
    setCache: (state, action) => {
      state.cache[action.payload.table] = action.payload.data;
    },
  },
});

export const {
  addSelectedId,
  clearSelectedIds,
  addTables,
  setActiveTable,
  setCache,
} = tablesSlice.actions;

export default tablesSlice.reducer;
