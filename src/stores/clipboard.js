import { defineStore } from "pinia";
import { ref } from "vue";

export const useClipboardStore = defineStore("clipboard", () => {
  const data = ref(JSON.parse(localStorage.getItem("clipboardData") || "[]"));

  const setData = (newData) => {
    data.value = newData;
    localStorage.setItem("clipboardData", JSON.stringify(data.value));
  };

  const insert = (content) => {
    if (content) {
      const pastedData = ref({
        content,
        copyInfo: "Copy!",
        copyIcon: "mynaui:clipboard",
        selected: false,
      });
      if (data.value.some((item) => item.content === content)) {
        data.value = data.value.filter((item) => item.content !== content);
        data.value.unshift(pastedData.value);
      } else {
        data.value.unshift(pastedData.value);
      }
      localStorage.setItem("clipboardData", JSON.stringify(data.value));
    } else {
      // in case of empty or duplicated clipboard
    }
  };

  const deleteItem = (content) => {
    data.value = data.value.filter((item) => item.content !== content);
    localStorage.setItem("clipboardData", JSON.stringify(data.value));
  };

  const deleteAll = () => {
    data.value = [];
    localStorage.removeItem("clipboardData");
  };

  return {
    data,
    setData,
    insert,
    deleteItem,
    deleteAll,
  };
});
