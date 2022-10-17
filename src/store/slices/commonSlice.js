import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const initialState = {
  interval: 15,
  loader: {
    pages: {
      sequences: {
        isLoadingFolders: true,
        isLoadingSequences: true,
      },
      tasks: {
        isLoadingStatistics: true,
        isLoadingTasks: true,
      },
      contacts: {
        isLoadingContacts: true,
      },
      b2b: {
        isLoadingPeople: true,
        isLoadingCompanies: true,
      },
    },
  },
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
  Templates: {
    Cache: {},
    Compiler: {
      Variables: [],
      StubContact: {},
    },
    Marketplace: {},
  },
  Folders: [],
  Chats: {
    Folders: [],
    Chats: [],
  },
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setLoaderStatus: (state, action) => {
      const page = action.payload.page;
      const part = action.payload.part;
      const isLoading = action.payload.value;

      state.loader.pages[page][part] = isLoading;
    },
    setCommonInfoTasks: (state, action) => {
      state.Tasks = action.payload;
      state.loader.pages.tasks.isLoadingStatistics = false;
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
      state.Templates = action.payload;
    },
    setFolders: (state, action) => {
      state.Folders = action.payload;
    },
    setChats: (state, action) => {
      state.Chats = { ...action.payload };

      state.Chats.Folders = [
        ...state.Chats.Folders,
        { id: 0, Name: "Все" },
      ].sort((f1, f2) => f1.id - f2.id);

      state.Chats.Chats = [...state.Chats.Chats].sort(
        (c1, c2) => moment(c2.Msgs[0].Time) - moment(c1.Msgs[0].Time)
      );
    },
    updateChatByOneMessage: (state, action) => {
      const chatId = action.payload.ChatId;
      const message = action.payload.Body;

      state.Chats.Chats = state.Chats.Chats.map((chat) =>
        chat.Contact.id === chatId
          ? { ...chat, Msgs: [...chat.Msgs, message] }
          : chat
      );

      state.Chats.Chats = [...state.Chats.Chats].sort(
        (c1, c2) =>
          moment(c2.Msgs.slice(-1).Time) - moment(c1.Msgs.slice(-1).Time)
      );
    },
    updateChatByOneMessageFromServer: (state, action) => {
      const chatId = action.payload.ChatId;

      state.Chats.Chats = state.Chats.Chats.map((chat) =>
        chat.Contact.id === chatId
          ? {
              ...chat,
              Msgs: chat.Msgs.map((message) =>
                message.id ? message : action.payload
              ),
            }
          : chat
      );

      state.Chats.Chats = [...state.Chats.Chats].sort(
        (c1, c2) =>
          moment(c2.Msgs.slice(-1).Time) - moment(c1.Msgs.slice(-1).Time)
      );
    },
    updateChatByAllMessagesFromServer: (state, action) => {
      const chatId = action.payload[0].ChatId;

      state.Chats.Chats = state.Chats.Chats.map((chat) =>
        chat.Contact.id === chatId ? { ...chat, Msgs: action.payload } : chat
      );

      state.Chats.Chats = [...state.Chats.Chats].sort(
        (c1, c2) =>
          moment(c2.Msgs.slice(-1).Time) - moment(c1.Msgs.slice(-1).Time)
      );
    },
  },
});

export const {
  setLoaderStatus,
  setCommonInfoTasks,
  setStatistickInfo,
  setCommonInfoSequences,
  setCurrentUser,
  setCommonInfoHtmlTemplates,
  setFolders,
  setChats,
  updateChatByOneMessage,
  updateChatByOneMessageFromServer,
  updateChatByAllMessagesFromServer,
} = commonSlice.actions;

export default commonSlice.reducer;
