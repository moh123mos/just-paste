<template>
  <div class="flex h-screen">
    <!-- Main Content -->
    <OnlyPaste />
    <!-- Sidebar -->
    <div :style="{ width: sidebarWidth + 'px' }" class="flex-shrink-0 relative">
      <div class="p-4 w-full flex justify-between items-center">
        <p class="font-medium text-xl">History</p>
        <div class="flex items-center gap-2 h-8">
          <button @click="toggleTheme" class="">
            <Icon :icon="themeIcon" width="18" height="18" />
          </button>
          <button
            class="rounded-full h-[30px] w-[90px] bg-secondary-light dark:bg-secondary-dark text-white dark:text-secondary-light capitalize text-sm"
          >
            clear all
          </button>
        </div>
      </div>
      <!-- Resizer -->
      <div
        class="absolute top-0 start-0 w-[1px] h-full cursor-ew-resize bg-secondary-dark"
        @mousedown="startResizing"
      >
        <div class="resize-icon">
          <Icon icon="heroicons:bars-2-solid" class="bg-secondary-light dark:bg-secondary-dark text-white dark:text-secondary-light rotate-90 absolute z-10 top-1/2 -translate-x-1/2 text-sm w-8 rounded-sm" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { Icon } from "@iconify/vue";
import OnlyPaste from "./OnlyPaste.vue";
import { useThemeStore } from "../stores/theme";

const themeStore = useThemeStore();
const themeIcon = computed(() => {
  return theme.value === "dark" ? "ri:moon-line" : "quill:sun";
});
let theme = computed((_) => themeStore.theme);
const toggleTheme = () => {
  themeStore.toggleTheme();
};

const sidebarWidth = ref(440); // Initial sidebar width
const minWidth = ref(400);
const maxWidth = ref(720);
const isResizing = ref(false);

// Methods
const startResizing = () => {
  isResizing.value = true;
  window.addEventListener("mousemove", resizeSidebar);
  window.addEventListener("mouseup", stopResizing);
};

const resizeSidebar = (event) => {
  if (isResizing.value) {
    let newWidth = window.innerWidth - event.clientX;
    if (newWidth >= minWidth.value && newWidth <= maxWidth.value) {
      sidebarWidth.value = newWidth;
    }
    console.log(newWidth);
  }
};

const stopResizing = () => {
  isResizing.value = false;
  window.removeEventListener("mousemove", resizeSidebar);
  window.removeEventListener("mouseup", stopResizing);
};

// Clean up listeners when the component is destroyed
onUnmounted(() => {
  stopResizing();
});
</script>

<style scoped>
</style>
