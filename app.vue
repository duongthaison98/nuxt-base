<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
    <Toaster />
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();
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
  } catch (error) {
    console.log("error", error);
  
    useCookie('access_token').value = null;
    useCookie('refresh_token').value = null;
    authStore.isAuthenticated = false;
    
    router.push('/');
  } finally {
    return null;
  }
})
</script>