<template>
  <div
    class="flex flex-col md:flex-row h-screen bg-background-light dark:bg-background-dark text-primary-light dark:text-primary-dark transition-colors duration-300"
  >
    <DarkLightMode />
    <OnlyPaste />
    <HistorySidebar />
  </div>
</template>

<script setup>
import DarkLightMode from "./components/DarkLightMode.vue";
import HistorySidebar from "./components/HistorySidebar.vue";
import OnlyPaste from "./components/OnlyPaste.vue";
</script>
<style scoped></style>
