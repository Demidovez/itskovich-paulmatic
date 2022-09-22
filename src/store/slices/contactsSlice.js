import { createSlice } from "@reduxjs/toolkit";

// TODO: Пока редусер не нужен, работа идет через RTK
// возможно понадобиться в будущем

const initialState = {
  selectedIds: [],
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
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },
});

export const { addContactId, clearSelectedIds } = contactsSlice.actions;

export default contactsSlice.reducer;
