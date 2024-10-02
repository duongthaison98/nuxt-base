<template>
  <div class="home-page h-[100svh]">
    <div class="banner"></div>
    <div class="form-wrap relative">
      <div class="logo">
        <NuxtImg src="/images/logo.png" width="280" height="169" class="mx-auto" alt="" />
      </div>
      <LoginView
        v-show="currentForm === 'login'"
        @onLogin="handleLogin"
        @onChangeCurrentForm="changeCurrentForm"
      />
      <RegisterView
        v-show="currentForm === 'register'"
        @onLogin="handleLogin"
        @onChangeCurrentForm="changeCurrentForm"
      />
    </div>
  </div>
</template> 

<script setup lang="ts">
import '@/assets/css/pages/_home.scss';
import LoginView from '~/components/pageComponents/home/Login.vue';
import RegisterView from '~/components/pageComponents/home/Register.vue';
import UserRepo from '~/repositories/userRepository/index';
import { useNotify } from '~/composables/useNotify';
import { useAuthStore } from '@/stores/auth';
import { useChatStore } from '@/stores/chat';

const router = useRouter();
const authStore = useAuthStore();
const chatStore = useChatStore();

const currentForm = ref<'login' | 'register' | 'forget_pass'>('login');
const changeCurrentForm = (value) => {
  currentForm.value = value;
}

const handleLogin = async (data: any) => {
  try {
    const resLogin = await UserRepo.login(data);
    useCookie('access_token').value = resLogin.Data.access_token;
    useCookie('refresh_token').value = resLogin.Data.refresh_token;

    const resUserInfo = await UserRepo.getUserInfo();
    authStore.userInfo = resUserInfo.Data;

    authStore.isAuthenticated = true;

    chatStore.chatColor = getRandomChatColor();
    
    router.push('/live');
  } catch (error: any) {
    console.log(error);
    useNotify(error, 'destructive');
  }
}
</script>