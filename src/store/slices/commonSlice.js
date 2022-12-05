import { createSlice, current } from "@reduxjs/toolkit";
import moment from "moment";

const initialState = {
  interval: 15,
  isLoaded: false,
  isNeedSetEmailServer: false,
  showedMessageTariffModal: "",
  // timeZones: [
  //   "(UTC+01:00) Амстердам, Берлин, Берн, Рим, Стокгольм, Вена",
  //   "(UTC+01:00) Белград, Кабул, Будапешт, Любляна, Прага",
  //   "(UTC+01:00) Брюссель, Копенгаген, Мадрид, Париж",
  //   "(UTC+01:00) Виндхук",
  //   "(UTC+01:00) Западная Африка",
  //   "(UTC+01:00) Западная Центральная Африка",
  //   "(UTC+01:00) Сараево, Скопье, Варшава, Будапешт",
  //   "(UTC+02:00) Амман",
  //   "(UTC+02:00) Афины, Бухарест",
  //   "(UTC+02:00) Бейрут",
  //   "(UTC+02:00) Д. Европа",
  //   "(UTC+02:00) Дамаск",
  //   "(UTC+02:00) Иерусалим",
  //   "(UTC+02:00) Литва",
  //   "(UTC+02:00) Стамбул",
  //   "(UTC+02:00) Хараре, Претория",
  //   "(UTC+02:00) Хельсинки, Киев, Рига, София, Эстония, Минск",
  //   "(UTC+02:00) Cairo",
  //   "(UTC+03:00) Багдад",
  //   "(UTC+03:00) Кувейт, Эр-Рияд",
  //   "(UTC+03:00) Минск",
  //   "(UTC+03:00) Москва, Санкт-Петербург",
  //   "(UTC+03:00) Найроби",
  //   "(UTC+03:30) Тегеран",
  //   "(UTC+04:00) Абу-Даби, Мускат",
  //   "(UTC+04:00) Баку",
  //   "(UTC+04:00) Ереван",
  //   "(UTC+04:00) Порт-Луи",
  //   "(UTC+04:00) Тбилиси",
  //   "(UTC+04:30) Кабул",
  //   "(UTC+05:00) Исламабад, Карачи",
  //   "(UTC+05:00) Питчер, Узбекистан",
  //   "(UTC+05:30) Ченнаи, Колката, Мумбаи, Нью-Дели",
  //   "(UTC+05:30) Шри Jayawardenepura",
  //   "(UTC+05:45) Катманду",
  //   "(UTC+06:00) Астана",
  //   "(UTC+06:00) Дакка",
  //   "(UTC+06:30) Янгон (Рангун)",
  //   "(UTC+07:00) Бангкок, Ханой, Джакарта",
  //   "(UTC+08:00) Куала-Лумпур, Сингапур",
  //   "(UTC+08:00) Пекин, Чунцин, Гонконг, Урумчи",
  //   "(UTC+08:00) Тайбэй",
  //   "(UTC+08:00) Улаанбаатар",
  //   "(UTC+09:00) Осака, Саппоро, Токио",
  //   "(UTC+09:00) Сеул",
  //   "(UTC+10:00) Гуам, Порт Моресби",
  //   "(UTC+10:00) Канберра, Мельбурн, Сидней",
  //   "(UTC+11:00) Соломон Ис., Новая Каледония",
  //   "(UTC+12:00) Координированное универсальное время+12",
  //   "(UTC+12:00) Окленд, Веллингтон",
  //   "(UTC+12:00) Фиджи",
  //   "(UTC+13:00) Нукуалофа",
  //   "(UTC+13:00) Самоа",
  //   "(UTC-01:00) Кабо-Верде.",
  //   "(UTC-03:00) Бразилиа",
  //   "(UTC-03:00) Город Буэнос-Айрес",
  //   "(UTC-03:00) Гренландия",
  //   "(UTC-03:00) Кайенна, Fortaleza",
  //   "(UTC-03:00) Монтевидео",
  //   "(UTC-03:00) Сантьяго",
  //   "(UTC-03:00) Cayenne, Fortaleza",
  //   "(UTC-04:00) Асунсьон",
  //   "(UTC-04:00) Атлантическое время (Канада)",
  //   "(UTC-04:00) Джорджтаун, Ла Пас, Манаус, Сан-Хуан",
  //   "(UTC-04:30) Каракас",
  //   "(UTC-05:00) Богота, Лима, Кито, Рио Бранко",
  //   "(UTC-05:00) Восточное время (КАНАДА)&",
  //   "(UTC-05:00) Восточное время (США & Канада)",
  //   "(UTC-06:00) Гвадалахара, Мехико, Монтеррей",
  //   "(UTC-06:00) Центральная Америка",
  //   "(UTC-07:00) Горное время (КАНАДА)&",
  //   "(UTC-08:00) Тихоокеанское время (КАНАДА)&",
  //   "(UTC-10:00) Гавайи",
  //   "(UTC) Время в формате UTC",
  //   "(UTC) Дублин, Эдинбург, Лиссабон, Лондон",
  //   "(UTC) Касабланка",
  //   "(UTC) Монровия, Рейкьявик",
  // ],
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
  Contacts: {
    Fields: [],
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
  TimeZones: [],
  Account: {
    InMailSettings: null,
    TimeZoneId: 56,
    Tariff: {
      Creds: {
        Name: "",
      },
      FeatureAbilities: {},
    },
    Subordinates: [],
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
    setTimeZones: (state, action) => {
      state.TimeZones = action.payload;
    },
    updateAccount: (state, action) => {
      state.Account = { ...state.Account, ...action.payload };
    },
    updatePayment: (state, action) => {
      state.Account = state.Account;
    },
    saveTimeZoneAccount: (state, action) => {
      state.Account.TimeZoneId = action.payload;
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
          ...state.Tasks?.Types,
          auto_email: {
            Creds: { Title: "Автоматический E-mail", Name: "auto_mail" },
            Actions: [{ Name: "send_letter", Title: "Отправить письмо" }],
          },
        },
      };
    },
    setCommonInfoContacts: (state, action) => {
      state.Contacts = action.payload;
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
      if (action.payload) {
        state.Chats.Folders = [
          ...action.payload.Folders,
          { id: 0, Name: "Все" },
        ].sort((f1, f2) => f1.id - f2.id);

        state.Chats.Chats = [...(action.payload.Chats || [])].sort(
          (c1, c2) =>
            moment(c2.Msgs.slice(-1)[0].Time) -
            moment(c1.Msgs.slice(-1)[0].Time)
        );

        state.Chats.ModifiedTime = new Date().getTime();
      }
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
    updateChatByOneMessageHiddenly: (state, action) => {
      const chatId = action.payload.ChatId;

      state.Chats.Chats = state.Chats.Chats.map((chat) =>
        chat.Contact.id === chatId
          ? {
              ...chat,
              Msgs: chat.Msgs.map((message) =>
                message.id ? message : { ...message, ...action.payload }
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

          const hasMessageWithoutId = chat.Msgs.some((message) =>
            isNaN(message.id)
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
                  : hasMessageWithoutId
                  ? chat.Msgs.map((message) =>
                      isNaN(message.id) ? notify.Msgs[0] : message
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
      state.showedMessageTariffModal = action.payload;
    },
  },
});

export const {
  saveAccount,
  setLoaderStatus,
  setTimeZones,
  setCommonInfoTasks,
  setStatistickInfo,
  setCommonInfoSequences,
  setCommonInfoHtmlTemplates,
  setFolders,
  setChats,
  updateChatByOneMessage,
  updateChatByOneMessageHiddenly,
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
  saveTimeZoneAccount,
  // deleteSubordinate,
  setCommonInfoContacts,
} = commonSlice.actions;

export default commonSlice.reducer;
