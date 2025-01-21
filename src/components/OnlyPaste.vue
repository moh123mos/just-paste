<template>
  <div
    @click="pasteText"
    @paste="pasteText"
    class="flex-1 text-center p-4 w-full h-screen cursor-pointer flex justify-center items-center flex-col text-primary-light dark:text-primary-dark"
  >
    <h1 class="text-4xl md:text-6xl lg:text-8xl pt-10 pb-5 px-5 md:p-0">Just Paste it.</h1>
    <p class="text-sm">You can just CLICK on this section too.</p>
  </div>
</template>

<script setup>
import { useClipboardStore } from "@/stores/clipboard";
const clipboardStore = useClipboardStore();

const pasteText = () => {
  navigator.clipboard.readText().then((content) => {
    clipboardStore.insert(content);
  });
};
</script>
