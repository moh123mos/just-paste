import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useThemeStore = defineStore('theme', () => {
  const theme = ref(localStorage.getItem('theme') || getSystemTheme());

  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  const applyTheme = (newTheme) => {
    theme.value = newTheme;
    document.documentElement.classList.toggle('dark', theme.value === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  const toggleTheme = () => {
    applyTheme(theme.value === 'dark' ? 'light' : 'dark');
  };

  const initTheme = () => {
    applyTheme(theme.value);
  };

  return {
    theme,
    toggleTheme,
    initTheme,
  };
});
