import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedIds: [],
  currentPage: 0,
  searchValue: "",
};

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContactId: (state, action) => {
      state.selectedIds = state.selectedIds.includes(action.payload)
        ? state.selectedIds.filter((id) => id !== action.payload)
        : [...state.selectedIds, action.payload];
    },
    clearSelectedIds: (state, action) => {
      state.selectedIds = [];
    },
    setCurrentContactPage: (state, action) => {
      state.currentPage = action.payload;
    },
    searchValueContactPage: (state, action) => {
      state.searchValue = action.payload;
    },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },
});

export const {
  addContactId,
  clearSelectedIds,
  setCurrentContactPage,
  searchValueContactPage,
} = contactsSlice.actions;

export default contactsSlice.reducer;
