import { defineStore } from "pinia";
import axios from "axios";
//import { createPersistPlugin } from "pinia-persist";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    loggedIn: false,
    userInfo: null,
  }),
  // plugins: [createPersistPlugin()],
  actions: {
    async login() {
      this.loggedIn = true;

      const response = await axios.get;
    },
    async logout() {},
  },
});
