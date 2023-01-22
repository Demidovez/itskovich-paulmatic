import Dashboard from "~src/pages/Dashboard.js";
import Profile from "~src/pages/Profile.js";
import Register from "~src/pages/Register.js";
import Login from "~src/pages/Login.js";
import Contacts from "~src/pages/Contacts.js";
import BtoB from "~src/pages/BtoB.jsx";
import Tasks from "~src/pages/Tasks";
import Sequences from "~src/pages/Sequences";
import Inbox from "~src/pages/Inbox";
import DashboardIcon from "~src/assets/img/icons/common/dashboard.svg";
import ContactsIcon from "~src/assets/img/icons/common/contacts.svg";
import InboxIcon from "~src/assets/img/icons/common/inbox.svg";
import SequencesIcon from "~src/assets/img/icons/common/sequences.svg";
import TasksIcon from "~src/assets/img/icons/common/tasks.svg";
import B2bIcon from ".~src/assets/img/icons/common/b2b.svg";

export const ROUTES = {
  index: {
    path: "/index",
    name: "Дашборд",
    icon: () => <DashboardIcon style={{ width: 40, height: 40 }} />,
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
