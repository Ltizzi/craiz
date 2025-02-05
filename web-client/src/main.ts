import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import axios from "axios";

import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHeart as faHeartS,
  faEllipsis,
  faArrowsRotate,
  faShareNodes,
  faCircleChevronUp,
  faCircleChevronLeft,
  faMagnifyingGlass,
  faBell,
  faUser,
  faRightToBracket,
  faRightFromBracket,
  faPlus,
  faCircleCheck,
  faCircleXmark,
  faHome,
  faArrowTrendUp,
  faCircleExclamation,
  faAt,
  faLock,
  faHammer,
  faCircleMinus,
  faBan,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart, faComment } from "@fortawesome/free-regular-svg-icons";

export const API_URL = "http://localhost:4246/v1/";
//export const API_URL = "https://crazeapi.onrender.com/v1/";

export const RELOAD_TIMER = 1000 * 60;

library.add(
  faHeart,
  faHeartS,
  faComment,
  faEllipsis,
  faArrowsRotate,
  faShareNodes,
  faCircleChevronUp,
  faCircleChevronLeft,
  faMagnifyingGlass,
  faBell,
  faUser,
  faRightToBracket,
  faRightFromBracket,
  faPlus,
  faCircleCheck,
  faCircleXmark,
  faHome,
  faArrowTrendUp,
  faCircleExclamation,
  faAt,
  faLock,
  faHammer,
  faCircleMinus,
  faBan
);

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

axios.interceptors.request.use((config) => {
  config.withCredentials = true;
  config.headers["Access-Control-Allow-Origin"] = "https://craze-test.web.app";
  config.headers["Access-Control-Allow-Methods"] =
    "GET, POST, PUT, DELETE, OPTIONS";
  config.headers["Access-Control-Allow-Headers"] =
    "Origin, Content-Type, Accept, Authorization, set-cookie, cookie";
  return config;
});

//app.provide("authStore", useAuthStore());
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
