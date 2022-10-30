import Dashboard from "pages/Dashboard.js";
import Profile from "pages/Profile.js";
import Register from "pages/Register.js";
import Login from "pages/Login.js";
import Contacts from "pages/Contacts.js";
import BtoB from "pages/BtoB.js";
import Tasks from "pages/Tasks";
import Sequences from "pages/Sequences";
import Inbox from "pages/Inbox";
import { ReactComponent as DashboardIcon } from "../src/assets/img/icons/common/dasboard-menu-icon.svg";
import { ReactComponent as ContactsIcon } from "../src/assets/img/icons/common/contacts-menu-icon.svg";
import { ReactComponent as InboxIcon } from "../src/assets/img/icons/common/inbox-menu-icon.svg";
import { ReactComponent as SequencesIcon } from "../src/assets/img/icons/common/sequences-menu-icon.svg";
import { ReactComponent as TasksIcon } from "../src/assets/img/icons/common/tasks-menu-icon.svg";
import { ReactComponent as B2bIcon } from "../src/assets/img/icons/common/b2b-menu-icon.svg";

export const ROUTES = {
  index: {
    path: "/index",
    name: "Дашборд",
    icon: () => (
      <DashboardIcon fill="var(--primary)" style={{ width: 40, height: 40 }} />
    ),
    // icon: "ni ni-tv-2 text-primary",
    component: Dashboard,
    layout: "/admin",
  },
  "user-profile": {
    path: "/user-profile",
    name: "Мой профиль",
    icon: () => <DashboardIcon style={{ width: 40, height: 40 }} />,
    // icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
    position: "user",
  },
  contacts: {
    path: "/contacts",
    name: "Контакты",
    icon: () => <ContactsIcon fill="red" style={{ width: 40, height: 40 }} />,
    // icon: "ni ni-bullet-list-67 text-red",
    component: Contacts,
    layout: "/admin",
  },
  b2b: {
    path: "/b2b",
    name: "B2B Database",
    icon: () => <B2bIcon fill="red" style={{ width: 40, height: 40 }} />,
    // icon: "ni ni-archive-2 text-red",
    component: BtoB,
    layout: "/admin",
  },
  tasks: {
    path: "/tasks",
    name: "Задачи",
    icon: () => <TasksIcon fill="purple" style={{ width: 40, height: 40 }} />,
    // icon: "ni ni-air-baloon text-purple",
    component: Tasks,
    layout: "/admin",
  },
  sequences: {
    path: "/sequences",
    name: "Последовательности",
    icon: () => (
      <SequencesIcon fill="green" style={{ width: 40, height: 40 }} />
    ),
    // icon: "ni ni-align-center text-green",
    component: Sequences,
    layout: "/admin",
  },
  inbox: {
    path: "/inbox",
    name: "InBox",
    icon: () => <InboxIcon fill="blue" style={{ width: 40, height: 40 }} />,
    // icon: "ni ni-box-2 text-blue",
    component: Inbox,
    layout: "/admin",
  },
  login: {
    path: "/login",
    name: "Login",
    icon: () => (
      <i
        className={`ni ni-key-25 text-info pr-lg-2 pr-md-0 ml--2 ml-md-0 mt--1`}
      />
    ),
    component: Login,
    layout: "/auth",
    position: "user",
  },
  register: {
    path: "/register",
    name: "Register",
    icon: () => (
      <i
        className={`ni ni-circle-08 text-pink text-info pr-lg-2 pr-md-0 ml--2 ml-md-0 mt--1`}
      />
    ),
    // icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
    position: "user",
  },
};
