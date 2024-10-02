<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator color="red" />
    <NuxtPage />
    <Toaster />
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { getRandomChatColor } from "@/utils/randomChatColor";
import { useAuthStore } from '@/stores/auth';
import { useChatStore } from '@/stores/chat';

const router = useRouter();
const authStore = useAuthStore();
const chatStore = useChatStore();
const config = useRuntimeConfig();
const accessToken = useCookie('access_token').value;

const { data, error } = await useAsyncData('fetchData', async () => {
  try {
    const resUserInfo = await axios.get(`${config.public.baseURL}/community/api/v2.0/user-info`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    
    authStore.userInfo = resUserInfo.data.Data;
  
    authStore.isAuthenticated = true;

    chatStore.chatColor = getRandomChatColor();    
  } catch (error) {  
    useCookie('access_token').value = null;
    useCookie('refresh_token').value = null;
    authStore.isAuthenticated = false;
    
    router.push('/');
  } finally {
    return null;
  }
})
</script>