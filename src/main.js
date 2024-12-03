import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import apiClient from "./api/apiClient";

const app = createApp(App);

app.config.globalProperties.$apiClient = apiClient;
app.use(router);

app.mount("#app");
