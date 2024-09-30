<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
    <Toaster />
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import UserRepo from '~/repositories/UserRepository/index';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();
const config = useRuntimeConfig();
const accessToken = useCookie('access_token').value;

await callOnce(async () => {
  try {    
    const resUserInfo = await axios.get(`${config.public.baseURL}/community/api/v2.0/user-info1`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    
    console.log("resUserInfo", resUserInfo.data.Data);
    authStore.userInfo = resUserInfo.data.Data;

    authStore.isAuthenticated = true;
  } catch (error) {
    
    console.log(error);
    
    useCookie('access_token').value = null;
    useCookie('refresh_token').value = null;
    authStore.isAuthenticated = false;
    router.push('/');
    console.log('run here');
  }
})
</script>