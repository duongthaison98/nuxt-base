<template>
  <div class="header flex items-center justify-between px-5 py-3 relative h-[5rem]">
    <div class="header-logo">
      <NuxtImg src="/images/nav-logo.svg" width="100" height="40" alt="" />
    </div>
    <div class="box-user">
      <div class="flex items-center">
        <NuxtImg :src="authStore.userInfo?.avatar_url || '/images/no_ava.png'" width="40" height="40" class="rounded-full" />
        <div class="text-yellow-500 ml-3 text-xl">{{ authStore.userInfo?.user_name }}</div>
        <Button class="bg-red-600 text-xs hover:bg-red-600 h-[auto] p-2 ml-3" @click="handleLogout()">
          <ExitIcon />
        </Button>
      </div>
    </div>
    <div class="effect"></div>
  </div>
</template>

<script setup lang="ts">
import '@/assets/css/layout/_header.scss';
import { useAuthStore } from '@/stores/auth';
import { ExitIcon } from '@radix-icons/vue'

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  useCookie('access_token').value = null;
  useCookie('refresh_token').value = null;
  authStore.isAuthenticated = false;
  
  router.push('/');
}
</script>