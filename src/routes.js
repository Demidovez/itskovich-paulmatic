import Index from "pages/Index.js";
import Profile from "pages/Profile.js";
import Maps from "pages/Maps.js";
import Register from "pages/Register.js";
import Login from "pages/Login.js";
import Contacts from "pages/Contacts.js";
import BtoB from "pages/BtoB.js";
import Icons from "pages/Icons.js";
import Tasks from "pages/Tasks";
import Sequences from "pages/Sequences";
import Inbox from "pages/Inbox";

var routes = [
  {
    path: "/index",
    name: "Дашборд",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin",
    position: "user",
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/admin",
    position: "user",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
    position: "user",
  },
  {
    path: "/contacts",
    name: "Контакты",
    icon: "ni ni-bullet-list-67 text-red",
    component: Contacts,
    layout: "/admin",
  },
  {
    path: "/b2b",
    name: "B2B Database",
    icon: "ni ni-archive-2 text-red",
    component: BtoB,
    layout: "/admin",
  },
  {
    path: "/tasks",
    name: "Задачи",
    icon: "ni ni-air-baloon text-purple",
    component: Tasks,
    layout: "/admin",
  },
  {
    path: "/sequences",
    name: "Последовательности",
    icon: "ni ni-align-center text-green",
    component: Sequences,
    layout: "/admin",
  },
  {
    path: "/inbox",
    name: "InBox",
    icon: "ni ni-box-2 text-blue",
    component: Inbox,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
    position: "user",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
    position: "user",
  },
];
export default routes;
