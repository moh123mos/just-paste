import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./style.css";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);

// Initialize theme
import { useThemeStore } from "./stores/theme";
const themeStore = useThemeStore();
themeStore.initTheme();

app.mount("#app");
