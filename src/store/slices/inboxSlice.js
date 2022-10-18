import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeFolderId: 0,
  activeChatId: -1,
  searchChatUser: "",
  searchedChatId: -1,
  searchedMessageId: -1,
  data: {},
};

export const inboxSlice = createSlice({
  name: "inbox",
  initialState,
  reducers: {
    setActiveFolderId: (state, action) => {
      state.activeFolderId = action.payload;
      state.searchedChatId = -1;
      state.searchedMessageId = -1;
    },
    setActiveChatId: (state, action) => {
      state.activeChatId = action.payload;
      state.searchedChatId = -1;
      state.searchedMessageId = -1;
    },
    setSearchedMessage: (state, action) => {
      state.searchedChatId = action.payload.ChatId;
      state.searchedMessageId = action.payload.id;
      state.activeChatId = action.payload.ChatId;
    },
    setSearchChatUser: (state, action) => {
      state.searchChatUser = action.payload;
      state.searchedChatId = -1;
      state.searchedMessageId = -1;
    },
  },
});

export const {
  setActiveFolderId,
  setActiveChatId,
  setSearchChatUser,
  setSearchedMessage,
} = inboxSlice.actions;

export default inboxSlice.reducer;
