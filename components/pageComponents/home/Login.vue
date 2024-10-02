<template>
  <div class="form-main">
    <div class="header">Đăng nhập</div>
    <div class="form-content">
      <form @keyup.enter="handleSubmit()">
        <div class="form-group mb-5">
          <Label class="text-base mb-3 block">Tài khoản</Label>
          <Input 
            type="text" 
            class="border-0 border-b rounded-none shadow-none !ring-0 text-base"
            v-model="formLogin.username" 
          />
          <div v-if="errors.username" class="text-red-500 text-sm">{{ errors.username }}</div>
        </div>
        <div class="form-group mb-5">
          <Label class="text-base mb-3 block">Mật khẩu</Label>
          <Input 
            type="password" 
            class="border-0 border-b rounded-none shadow-none !ring-0 text-base"
            v-model="formLogin.password" 
          />
          <div v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</div>
        </div>
        <Button type="button" class="btn-login" @click="handleSubmit()">Đăng nhập</Button>
      </form>
      <div class="register-forget mt-[50px]">
        <a href="javascript:void(0)"  @click="changeCurrentForm('register')" class="btn-register-forget">Đăng ký tài khoản</a>
        <a href="javascript:void(0)" class="btn-register-forget mb-0">Quên mật khẩu</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LoginForm, CurrentForm } from '@/types';
import { useNotify } from '~/composables/useNotify';
import { z } from 'zod';

const emit = defineEmits(['onLogin', 'onChangeCurrentForm']);

const formLogin = ref<LoginForm>({
  username: "",
  password: ""
})

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required')
})

const errors: any = reactive({
  username: '',
  password: ''
});

const handleSubmit = (() => {
  try {
    const result = loginSchema.safeParse({
      username: formLogin.value.username,
      password: formLogin.value.password
    });

    Object.keys(errors).forEach(key => errors[key] = '');

    if (!result.success) {
      result.error.errors.forEach(err => {
        const path = err.path[0] as keyof typeof errors;
        errors[path] = err.message;
      });
    } else {
      emit('onLogin', formLogin.value);
    }
  } catch (error) {
    console.log(error);
    useNotify(error, 'default');
  }
})

const changeCurrentForm = ((value: CurrentForm) => {
  emit('onChangeCurrentForm', value);
})
</script>