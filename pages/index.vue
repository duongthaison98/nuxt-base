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
        :image="image"
        :currentForm="currentForm"
        @onGetCaptcha="getCaptcha"
        @onRegister="handleRegister"
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
import type { CurrentForm, LoginForm, RegisterForm } from '@/types';
import { useNotify } from '~/composables/useNotify';
import { useAuthStore } from '@/stores/auth';
import { useChatStore } from '@/stores/chat';

const router = useRouter();
const authStore = useAuthStore();
const chatStore = useChatStore();

const currentForm = ref<CurrentForm>('login');
const changeCurrentForm = (value: CurrentForm) => {
  currentForm.value = value;
}

const image = ref<string>('');
const captchaID = ref<string>('');
const getCaptcha = async () => {
  try {
    const res = await UserRepo.getCaptcha();
    image.value = res.Data.Image;
    captchaID.value = res.Data.CaptchaId;
  } catch (error) {
    console.log(error);
    useNotify('Captcha failed, please try again', 'default');
  }
}

watch(currentForm, () => {
  if (currentForm.value === 'register' || currentForm.value === 'forget_pass') {
    getCaptcha();
  }
})

const handleLogin = async (payload: LoginForm) => {
  try {
    const resLogin = await UserRepo.login(payload);
    useCookie('access_token').value = resLogin.Data.access_token;
    useCookie('refresh_token').value = resLogin.Data.refresh_token;

    const resUserInfo = await UserRepo.getUserInfo();
    authStore.userInfo = resUserInfo.Data;

    authStore.isAuthenticated = true;

    chatStore.chatColor = getRandomChatColor();
    
    router.push('/live');
  } catch (error) {
    console.log(error);
    useNotify(error, 'default');
  }
}

const handleRegister = async (payload: RegisterForm) => {
  try {
    payload.captchaID = captchaID.value;
    await UserRepo.register(payload);
    
    currentForm.value = 'login';
    useNotify('Đăng kí thành công', 'default');
  } catch (error) {
    console.log(error);
    getCaptcha();
    useNotify(error, 'default');
  }
}

useHead({
  title: 'Trang chủ'
})
</script>