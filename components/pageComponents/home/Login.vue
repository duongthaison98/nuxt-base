<template>
  <div class="form-main">
    <div class="header">Đăng nhập</div>
    <form class="form-content">
      <div class="form-group mb-4">
        <Label class="text-base">Tài khoản</Label>
        <Input 
          type="text" 
          class="border-0 border-b rounded-none shadow-none !ring-0 text-base"
          v-model="formLogin.username" 
        />
      </div>
      <div class="form-group mb-4">
        <Label class="text-base">Mật khẩu</Label>
        <Input 
          type="password" 
          class="border-0 border-b rounded-none shadow-none !ring-0 text-base"
          v-model="formLogin.password" 
        />
      </div>
      <Button type="button" @click="handleSubmit()">
        Submit
      </Button>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { LoginForm } from '@/types';

const emit = defineEmits<{
  (e: 'submit', payload: LoginForm): void;
}>();

const formLogin = ref<LoginForm>({
  username: "",
  password: ""
})

const handleSubmit = (() => {
  emit('submit', formLogin.value);
})
</script>