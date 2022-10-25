import { createSlice, current } from "@reduxjs/toolkit";
import moment from "moment";

const initialState = {
  interval: 15,
  isLoaded: false,
  isNeedSetEmailServer: false,
  isShowedTariffModal: false,
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
  tariffs: [],
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
  Account: {
    InMailSettings: null,
    Tariff: {
      Creds: {
        Name: "",
      },
      FeatureAbilities: {},
    },
  },
  AccountSettings: {
    EmailServers: [],
  },
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
    ModifiedTime: 0,
    Folders: [],
    Chats: [],
    ActiveChat: {
      Contact: {},
      Msgs: [],
    },
  },
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    saveAccount: (state, action) => {
      state.Account = {
        ...state.Account,
        ...action.payload,
        InMailSettings: (action.payload || {}).InMailSettings || null,
      };
    },
    updateAccount: (state, action) => {
      state.Account = { ...state.Account, ...action.payload };
    },
    updatePayment: (state, action) => {
      state.Account = state.Account;
    },
    setLoaderStatus: (state, action) => {
      const page = action.payload.page;
      const part = action.payload.part;
      const isLoading = action.payload.value;

      state.loader.pages[page][part] = isLoading;
    },
    setCommonInfoTasks: (state, action) => {
      state.Tasks = action.payload;
      state.loader.pages.tasks.isLoadingStatistics = false;

      // TODO: Удалить потом
      state.Tasks = {
        ...state.Tasks,
        Types: {
          ...state.Tasks.Types,
          auto_email: { Creds: { Title: "Автоматический E-mail" } },
        },
      };
    },
    setCommonInfoSequences: (state, action) => {
      state.Sequences = action.payload;
    },
    setStatistickInfo: (state, action) => {
      state.Tasks.Stats = action.payload;
    },
    setCommonInfoHtmlTemplates: (state, action) => {
      state.Templates = action.payload;
    },
    addHtmlTemplates: (state, action) => {
      state.Templates.Cache = { ...state.Templates.Cache, ...action.payload };
    },
    setFolders: (state, action) => {
      state.Folders = action.payload;
    },
    setChats: (state, action) => {
      state.Chats.Folders = [
        ...action.payload.Folders,
        { id: 0, Name: "Все" },
      ].sort((f1, f2) => f1.id - f2.id);

      state.Chats.Chats = [...(action.payload.Chats || [])].sort(
        (c1, c2) =>
          moment(c2.Msgs.slice(-1)[0].Time) - moment(c1.Msgs.slice(-1)[0].Time)
      );

      state.Chats.ModifiedTime = new Date().getTime();
    },
    setInMailSettingsStatus: (state, action) => {
      state.Account.InMailSettings = action.payload;
    },
    setIsNeedSetEmailServer: (state, action) => {
      state.isNeedSetEmailServer = action.payload;
    },
    setAccountSettings: (state, action) => {
      state.AccountSettings = { ...state.AccountSettings, ...action.payload };
    },
    updateChatByOneMessage: (state, action) => {
      const chatId = action.payload.ChatId;
      const message = {
        Body: action.payload.Body,
        PlainBodyShort: action.payload.Body.replace(/(<([^>]+)>)/gi, "").slice(
          0,
          200
        ),
        Time: moment().format(),
        accountId: 1001,
        ChatId: chatId,
        My: true,
      };

      state.Chats.Chats = state.Chats.Chats.map((chat) =>
        chat.Contact.id === chatId
          ? {
              ...chat,
              Msgs: [...chat.Msgs, { ...message, Contact: chat.Contact }],
            }
          : chat
      );

      state.Chats.Chats = [...state.Chats.Chats].sort(
        (c1, c2) =>
          moment(c2.Msgs.slice(-1)[0].Time) - moment(c1.Msgs.slice(-1)[0].Time)
      );

      if (chatId === state.Chats.ActiveChat.Contact.id) {
        state.Chats.ActiveChat =
          state.Chats.Chats.find((chat) => chat.Contact.id === chatId) ||
          state.Chats.ActiveChat;
      }

      state.Chats.ModifiedTime = new Date().getTime();
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
          moment(c2.Msgs.slice(-1)[0].Time) - moment(c1.Msgs.slice(-1)[0].Time)
      );

      if (chatId === state.Chats.ActiveChat.Contact.id) {
        state.Chats.ActiveChat =
          state.Chats.Chats.find((chat) => chat.Contact.id === chatId) ||
          state.Chats.ActiveChat;
      }

      state.Chats.ModifiedTime = new Date().getTime();
    },
    updateChatByAllMessagesFromServer: (state, action) => {
      const chatId = action.payload[0].ChatId;

      state.Chats.Chats = state.Chats.Chats.map((chat) =>
        chat.Contact.id === chatId ? { ...chat, Msgs: action.payload } : chat
      );

      state.Chats.Chats = [...state.Chats.Chats].sort(
        (c1, c2) =>
          moment(c2.Msgs.slice(-1)[0].Time) - moment(c1.Msgs.slice(-1)[0].Time)
      );

      if (chatId === state.Chats.ActiveChat.Contact.id) {
        state.Chats.ActiveChat =
          state.Chats.Chats.find((chat) => chat.Contact.id === chatId) ||
          state.Chats.ActiveChat;
      }

      state.Chats.ModifiedTime = new Date().getTime();
    },
    updateChatByNotification: (state, action) => {
      const notify = action.payload.Object;

      const hasChat = [...state.Chats.Chats].some(
        (chat) => chat.Contact.id === notify.Contact.id
      );

      if (hasChat) {
        state.Chats.Chats = [...state.Chats.Chats].map((chat) => {
          const hasMessage = chat.Msgs.some(
            (message) => message.id === notify.Msgs[0].id
          );

          return chat.Contact.id === notify.Contact.id
            ? {
                ...chat,
                Msgs: hasMessage
                  ? chat.Msgs.map((message) =>
                      message.id === notify.Msgs[0].id
                        ? notify.Msgs[0]
                        : message
                    )
                  : [...chat.Msgs, notify.Msgs[0]],
              }
            : chat;
        });

        state.Chats.Chats = [...state.Chats.Chats].sort(
          (c1, c2) =>
            moment(c2.Msgs.slice(-1)[0].Time) -
            moment(c1.Msgs.slice(-1)[0].Time)
        );

        if (notify.Contact.id === state.Chats.ActiveChat.Contact.id) {
          state.Chats.ActiveChat =
            state.Chats.Chats.find(
              (chat) => chat.Contact.id === notify.Contact.id
            ) || state.Chats.ActiveChat;
        }
      } else {
        state.Chats.Chats = [...state.Chats.Chats, notify].sort(
          (c1, c2) =>
            moment(c2.Msgs.slice(-1)[0].Time) -
            moment(c1.Msgs.slice(-1)[0].Time)
        );
      }

      state.Chats.ModifiedTime = new Date().getTime();
    },
    moveChatToFolder: (state, action) => {
      const activeChatId = action.payload.activeChatId;
      const folderId = action.payload.folderId;

      state.Chats.Chats = [...state.Chats.Chats].map((chat) =>
        chat.Contact.id === activeChatId
          ? { ...chat, FolderID: folderId }
          : chat
      );

      state.Chats.ModifiedTime = new Date().getTime();
    },
    deleteChat: (state, action) => {
      const activeChatId = action.payload;

      state.Chats.Chats = [...state.Chats.Chats].filter(
        (chat) => chat.Contact.id !== activeChatId
      );

      state.Chats.ModifiedTime = new Date().getTime();
    },
    setTariffs: (state, action) => {
      const tariffs = action.payload.map((tariff) => {
        let currentTariff = tariff;

        if (currentTariff.Creds.Name === "Basic") {
          currentTariff = {
            ...currentTariff,
            color: "#636bff",
            period: "14 дней",
            proffitsTitle: "",
            proffits: [
              "Базовая автоматизация последовательности (Ограничение в 2 последовательности)",
              "Расширение для Gmail/LinkedIn",
              "Отправка 200 email’ов/день",
              "CSV импорт/экспорт",
              "Чтение, ответы на электронные письма",
              "Доступ к API",
              "Базовая аналитика и отчеты",
              "10 поисков email’ов в B2B Database",
            ],
          };
        } else if (currentTariff.Creds.Name === "Professional") {
          currentTariff = {
            ...currentTariff,
            color: "#fcb236",
            period: "в месяц",
            proffitsTitle: 'Всё, что в "Basic"',
            proffits: [
              "Неограниченное количество последовательностей",
              "Отправка 10 000 email’ов/день",
              "Интеграция со всеми поставщиками электронной почты",
              "Расширенная аналитика, отчеты и информационные панели",
              "A/B тестирование",
              "Ручные задачи",
              "Записи звонков",
              "400 поисков email’ов в месяц",
            ],
          };
        } else if (currentTariff.Creds.Name === "Enterprise") {
          currentTariff = {
            ...currentTariff,
            color: "#636bff",
            period: "оплата за год",
            proffitsTitle: 'Всё, что в "Professional"',
            proffits: [
              "Неограниченное количество email’ов/день",
              "Обогащенные данные о контакте и смена работы",
              "Транскрипция вызовов",
              "Настраиваемые отчеты",
              "Расширенный доступ к API",
              "Персональный менеджер по работе с клиентами",
              "1200+ поисков email’ов в месяц",
            ],
          };
        }

        return currentTariff;
      });

      state.tariffs = tariffs;
    },
    setShowTariffModal: (state, action) => {
      state.isShowedTariffModal = action.payload;
    },
  },
});

export const {
  saveAccount,
  setLoaderStatus,
  setCommonInfoTasks,
  setStatistickInfo,
  setCommonInfoSequences,
  setCommonInfoHtmlTemplates,
  setFolders,
  setChats,
  updateChatByOneMessage,
  updateChatByOneMessageFromServer,
  updateChatByAllMessagesFromServer,
  updateChatByNotification,
  moveChatToFolder,
  deleteChat,
  addHtmlTemplates,
  setInMailSettingsStatus,
  setAccountSettings,
  setIsNeedSetEmailServer,
  setTariffs,
  setShowTariffModal,
  updateAccount,
  updatePayment,
} = commonSlice.actions;

export default commonSlice.reducer;
