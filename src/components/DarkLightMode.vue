<template>
  <div class="fixed top-5 end-6 z-20">
    <button @click="toggleTheme" class="">
      <Icon :icon="themeIcon" width="18" height="18" />
    </button>
  </div>
</template>
<script setup>
import { useThemeStore } from "@/stores/theme";
import { Icon } from "@iconify/vue";
import { computed } from "vue";

// dark/light mode
const themeStore = useThemeStore();
const themeIcon = computed(() => {
  return theme.value === "dark" ? "ri:moon-line" : "quill:sun";
});
let theme = computed((_) => themeStore.theme);
const toggleTheme = () => {
  themeStore.toggleTheme();
};
</script>
