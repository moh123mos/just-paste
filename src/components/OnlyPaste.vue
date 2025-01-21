<template>
  <div
    @click="pasteText"
    @paste="pasteText"
    class="flex-1 text-center p-4 w-full h-screen cursor-pointer flex justify-center items-center flex-col text-primary-light dark:text-primary-dark"
  >
    <h1 class="text-4xl md:text-6xl lg:text-8xl pt-10 pb-5 px-5 md:p-0 md:pb-2">
      {{ pasteInfo }}
    </h1>
    <p class="text-sm">{{ desc }}</p>
  </div>
</template>

<script setup>
import { useClipboardStore } from "@/stores/clipboard";
import { ref } from "vue";
const clipboardStore = useClipboardStore();

let pasteInfo = ref("Just Paste it.");
let desc = ref("You can just CLICK on this section too.");

const pasteText = () => {
  pasteInfo.value = "Pasted!";
  desc.value = "";
  navigator.clipboard.readText().then((content) => {
    clipboardStore.insert(content);
  });
  setTimeout(() => {
    pasteInfo.value = "Just Paste it.";
    desc.value = "You can just CLICK on this section too.";
  }, 1000);
};

</script>
