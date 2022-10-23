import Dashboard from "pages/Dashboard.js";
import Profile from "pages/Profile.js";
import Register from "pages/Register.js";
import Login from "pages/Login.js";
import Contacts from "pages/Contacts.js";
import BtoB from "pages/BtoB.js";
import Tasks from "pages/Tasks";
import Sequences from "pages/Sequences";
import Inbox from "pages/Inbox";

export const ROUTES = {
  index: {
    path: "/index",
    name: "Дашборд",
    icon: "ni ni-tv-2 text-primary",
    component: Dashboard,
    layout: "/admin",
  },
  "user-profile": {
    path: "/user-profile",
    name: "Мой профиль",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
    position: "user",
  },
  contacts: {
    path: "/contacts",
    name: "Контакты",
    icon: "ni ni-bullet-list-67 text-red",
    component: Contacts,
    layout: "/admin",
  },
  b2b: {
    path: "/b2b",
    name: "B2B Database",
    icon: "ni ni-archive-2 text-red",
    component: BtoB,
    layout: "/admin",
  },
  tasks: {
    path: "/tasks",
    name: "Задачи",
    icon: "ni ni-air-baloon text-purple",
    component: Tasks,
    layout: "/admin",
  },
  sequences: {
    path: "/sequences",
    name: "Последовательности",
    icon: "ni ni-align-center text-green",
    component: Sequences,
    layout: "/admin",
  },
  inbox: {
    path: "/inbox",
    name: "InBox",
    icon: "ni ni-box-2 text-blue",
    component: Inbox,
    layout: "/admin",
  },
  login: {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
    position: "user",
  },
  register: {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
    position: "user",
  },
};
