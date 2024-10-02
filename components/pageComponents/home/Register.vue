<template>
  <div class="form-main">
    <div class="header">Đăng ký</div>
    <div class="form-content">
      <form action="">
        <div class="form-group mb-5">
          <Label class="text-base mb-3 block">Tài khoản</Label>
          <Input 
            type="text" 
            class="border-0 border-b rounded-none shadow-none !ring-0 text-base"
            v-model="formLogin.username" 
          />
        </div>
        <div class="form-group mb-5">
          <Label class="text-base mb-3 block">Mật khẩu</Label>
          <Input 
            type="password" 
            class="border-0 border-b rounded-none shadow-none !ring-0 text-base"
            v-model="formLogin.password" 
          />
        </div>
        <Button type="button" class="btn-login" @click="handleSubmit()">Đăng nhập</Button>
      </form>
      <div class="register-forget mt-[50px]">
        <a href="javascript:void(0)" @click="changeCurrentForm('login')" class="btn-register-forget">Đăng nhập</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LoginForm, CurrentForm } from '@/types';
import validate from '~/utils/validator';
import { useNotify } from '~/composables/useNotify';

const emit = defineEmits(['onLogin', 'onChangeCurrentForm']);

const formLogin = ref<LoginForm>({
  username: "",
  password: ""
})

const handleSubmit = (() => {
  try {
    validate.validateEmpty('Tài khoản', formLogin.value.username);
    validate.validateEmpty('Mật khẩu', formLogin.value.password);
    
    emit('onLogin', formLogin.value);
  } catch (error) {
    console.log(error);
    useNotify(error, 'default');
  }
})

const changeCurrentForm = ((value: CurrentForm) => {
  emit('onChangeCurrentForm', value);
})
</script>