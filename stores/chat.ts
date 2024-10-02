import { defineStore } from 'pinia';

export const useChatStore = defineStore('chat', () => {
  const chatColor = ref<string>('');

  return { chatColor };
})