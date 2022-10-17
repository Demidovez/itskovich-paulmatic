import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeFolderId: 0,
  activeChatId: -1,
  searchChatUser: "",
  data: {},
};

export const inboxSlice = createSlice({
  name: "inbox",
  initialState,
  reducers: {
    setActiveFolderId: (state, action) => {
      state.activeFolderId = action.payload;
    },
    setActiveChatId: (state, action) => {
      state.activeChatId = action.payload;
    },
    setSearchChatUser: (state, action) => {
      state.searchChatUser = action.payload;
    },
  },
});

export const { setActiveFolderId, setActiveChatId, setSearchChatUser } =
  inboxSlice.actions;

export default inboxSlice.reducer;
