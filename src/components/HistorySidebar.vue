<template>
  <!-- Sidebar -->
  <div
    :style="{ width: sidebarWidth + 'px' }"
    v-if="items.length > 0"
    class="flex-shrink-0 relative max-h-screen overflow-auto pt-5 md:pt-16 pb-12 border-s-0 border-t-2 md:border-t-0 md:border-s-2 border-[#f2f2f2] dark:border-[#3d3d3d]"
  >
    <div
      class="p-4 hidden sm-w-full md:flex justify-between items-center fixed top-0 bg-background-light dark:bg-background-dark z-10"
      :style="{ width: sidebarWidth - 30 + 'px' }"
    >
      <p class="font-medium text-xl">History</p>
    </div>
    <!-- items of paste data -->
    <div class="items px-3">
      <div
        class="bg-[#f2f2f2] dark:bg-[#3d3d3d] rounded-md py-3 px-4 flex gap-3 justify-between items-center mb-5"
        v-for="(item, i) in items"
        :key="i"
      >
        <input
          type="checkbox"
          name="paste"
          id="paste"
          v-model="item.selected"
          @change="displayClearSelected"
          class="accent-[#2d2d2d] dark:accent-[#ccc] rounded w-[30px] h-5"
        />
        <div
          class="relative group overflow-hidden cursor-pointer"
          @click="copyToClipboard(i)"
          :style="{ width: sidebarWidth - 30 + 'px' }"
        >
          <div
            :style="{ width: sidebarWidth - 170 + 'px' }"
            class="content overflow-hidden text-nowrap text-ellipsis group-hover:opacity-0 duration-200"
          >
            {{ item.content }}
          </div>
          <div
            class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 duration-300"
          >
            {{ item.copyInfo }}
          </div>
        </div>
        <div class="actions flex items-center gap-3">
          <div class="copy" @click="copyToClipboard(i)">
            <Icon
              class="cursor-pointer text-background-dark dark:text-[#ccc]"
              :icon="item.copyIcon"
              width="24"
              height="24"
            />
          </div>
          <div class="delete" @click="deleteItem(i)">
            <Icon
              class="cursor-pointer text-[#BE123C]"
              icon="fluent:delete-16-regular"
              width="24"
              height="24"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- clear items -->
    <div
      class="fixed end-0 bottom-0 bg-background-light dark:bg-background-dark border-t-2 border-[#f2f2f2] dark:border-[#3d3d3d] p-3 flex justify-end gap-1"
      :style="{ width: sidebarWidth + 'px' }"
    >
      <button
        v-if="!!hasSelected"
        class="rounded py-2 px-2 hover:bg-[#2d2d2ddc] dark:hover:bg-[#cccccc9b] dark:text-[#f2f2f2] text-background-dark hover:text-[#f2f2f2] dark:hover:text-background-dark capitalize text-sm duration-300"
        @click="clearSelected"
      >
        clear selected
      </button>
      <button
        class="rounded py-2 px-6 bg-background-dark dark:bg-[#ccc] text-[#f2f2f2] dark:text-background-dark capitalize text-sm"
        @click="clearAll"
      >
        clear all
      </button>
    </div>
    <!-- Resizer -->
    <div
      class="absolute top-0 start-0 w-[5px] h-full cursor-ew-resize"
      @mousedown="startResizing"
    >
      <div class="resize-icon">
        <Icon
          icon="heroicons:bars-2-solid"
          class="bg-background-dark dark:bg-background-light text-white dark:text-primary-light rotate-90 fixed z-10 top-1/2 -translate-x-1/2 text-sm w-8 rounded"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onUnmounted, ref } from "vue";
import { Icon } from "@iconify/vue";

// resizer
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

// copy operation
const items = ref(
  Array.from({ length: 8 }, () => ({
    content: `ipsum dolor sit amet consectetur ipsum dolor sit amet consectetur,
  ipsum dolor sit amet consectetur ipsum dolor sit amet consectetur,`,
    copyInfo: "Copy!",
    copyIcon: "mynaui:clipboard",
    selected: false,
  }))
);
const copyToClipboard = (i) => {
  items.value[i].copyInfo = "Copyed!";
  items.value[i].copyIcon = "fluent:clipboard-task-24-regular";
  setTimeout(() => {
    items.value[i].copyInfo = "Copy!";
    items.value[i].copyIcon = "mynaui:clipboard";
  }, 1000);
};

// delete
const hasSelected = ref(false);
const deleteItem = (i) => {
  items.value.splice(i, 1);
};
const clearSelected = () => {
  items.value = items.value.filter((item) => !item.selected);
  displayClearSelected();
};
const clearAll = () => {
  items.value = [];
};
const displayClearSelected = () => {
  hasSelected.value = items.value.some((item) => item.selected);
};
</script>

<style scoped>
@media (max-width: 768px) {
  .sm-w-full {
    width: 100% !important;
  }
}
</style>
