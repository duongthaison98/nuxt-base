<template>
  <div class="form-main">
    <div class="header">Đăng ký</div>
    <div class="form-content">
      <form @keyup.enter="handleSubmit()">
        <div class="form-group mb-5">
          <Label class="text-base mb-3 block">Tài khoản</Label>
          <Input 
            type="text" 
            class="border-0 border-b rounded-none shadow-none !ring-0 text-base"
            v-model="formRegister.username" 
          />
          <div v-if="errors.username" class="text-red-500 text-sm">{{ errors.username }}</div>
        </div>
        <div class="form-group mb-5">
          <Label class="text-base mb-3 block">Mật khẩu</Label>
          <Input 
            type="password" 
            class="border-0 border-b rounded-none shadow-none !ring-0 text-base"
            v-model="formRegister.password" 
          />
          <div v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</div>
        </div>
        <div class="form-group mb-5">
          <Label class="text-base mb-3 block">Xác nhận mật khẩu</Label>
          <Input 
            type="password" 
            class="border-0 border-b rounded-none shadow-none !ring-0 text-base"
            v-model="confirmPassword" 
          />
          <div v-if="errors.confirmPassword" class="text-red-500 text-sm">{{ errors.confirmPassword }}</div>
        </div>
        <div class="form-group mb-5">
          <Label class="text-base mb-3 block">Email</Label>
          <Input 
            v-model="formRegister.email" 
            type="email" 
            class="border-0 border-b rounded-none shadow-none !ring-0 text-base"
            autocomplete="new-email"
          />
          <div v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</div>
        </div>
        <div class="form-group mb-5">
          <Label class="text-base mb-3 block">Nhập mã xác nhận</Label>
          <div class="flex items-end">
            <Input 
              type="text" 
              class="border-0 border-b rounded-none shadow-none !ring-0 text-base"
              v-model="formRegister.captchaValue" 
            />
            <img
              :src="'data:image/png;base64,' + image"
              alt="img"
              class="w-2/5 cursor-pointer"
              @click="onGetCaptcha()"
            />
          </div>
          <div v-if="errors.captchaValue" class="text-red-500 text-sm">{{ errors.captchaValue }}</div>
        </div>
        <BaseButton @click="handleSubmit()">Đăng ký</BaseButton>
      </form>
      <div class="register-forget mt-[50px]">
        <a href="javascript:void(0)" @click="changeCurrentForm('login')" class="btn-register-forget">Đăng nhập</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '~/components/common/BaseButton.vue';
import type { RegisterForm, CurrentForm } from '@/types';
import { useNotify } from '~/composables/useNotify';
import { z } from 'zod';

interface Props {
  image: string;
  currentForm: CurrentForm
}

const { image, currentForm } = defineProps<Props>();

watch(() => currentForm, () => {
  clearForm();
})

const formRegister = ref<RegisterForm>({
  username: '',
  password: '',
  email: '',
  captchaID: '',
  captchaValue: ''
});
const confirmPassword = ref<string>('');

const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  confirmPassword: z.string().min(6, 'Password confirmation must be at least 6 characters long'),
  email: z.string().email('Invalid email format'),
  captchaValue: z.string().min(1, 'Captcha is required')
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword']
});

const errors: any = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  email: '',
  captchaValue: ''
});

const emit = defineEmits(['onRegister', 'onChangeCurrentForm', 'onGetCaptcha']);

const handleSubmit = (() => {
  try {
    const result = registerSchema.safeParse({
      username: formRegister.value.username,
      password: formRegister.value.password,
      confirmPassword: confirmPassword.value,
      email: formRegister.value.email,
      captchaValue: formRegister.value.captchaValue
    });

    Object.keys(errors).forEach(key => errors[key] = '');

    if (!result.success) {
      result.error.errors.forEach(err => {
        const path = err.path[0] as keyof typeof errors;
        errors[path] = err.message;
      });
    } else {
      emit('onRegister', formRegister.value);
    }
  } catch (error) {
    console.log(error);
    useNotify(error, 'default');
  }
})

const clearForm = () => {
  formRegister.value = {
    username: '',
    password: '',
    email: '',
    captchaID: '',
    captchaValue: ''
  };
  
  confirmPassword.value = '';

  Object.keys(errors).forEach(key => errors[key] = '');
};

const changeCurrentForm = ((value: CurrentForm) => {
  emit('onChangeCurrentForm', value);
})

const onGetCaptcha = (() => {
  emit('onGetCaptcha');
})
</script>