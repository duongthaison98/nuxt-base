import { defineStore } from 'pinia';

import type { UserInfo } from '@/types';

export const useAuthStore = defineStore('auth', () => {
  const userInfo = ref<UserInfo | null>(null);
  const isAuthenticated = ref<boolean>(false);

  return { userInfo, isAuthenticated };
})