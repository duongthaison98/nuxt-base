<template>
  <div class="home-page h-[100svh] ">
    <div class="banner"></div>
    <div class="form-wrap relative">
      <div class="logo">
        <NuxtImg src="/images/logo.png" width="280" height="169" class="mx-auto" alt="" />
      </div>
      <LoginView 
        @onLogin="handleLogin"
      />
    </div>
  </div>
</template> 

<script setup lang="ts">
import '@/assets/css/pages/_home.scss';
import LoginView from '~/components/pageComponents/home/Login.vue';
import UserRepository from '~/repositories/UserRepository/index';
import { useNotify } from '~/composables/useNotify';

const UserRepo = new UserRepository(useNuxtApp().$axios);

const handleLogin = (data: any) => {
  try {

    console.log('data', data.username);
    
    useNotify('Thành công', 'default');
  } catch (error: any) {
    console.log(error);
    useNotify(error, 'destructive');
  }
}
</script>