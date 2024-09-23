import axios from 'axios';
import type { NuxtApp } from 'nuxt/app';

export default defineNuxtPlugin((nuxtApp: NuxtApp) => {
  const config = useRuntimeConfig();
  const token = useCookie('token').value;

  const service = axios.create({
    baseURL: config.public.baseURL,
  })  

  service.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.data;
    
    return config;
  }, (error) => {
    return Promise.reject(error);
  })

  service.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      const { response } = error;
  
      return response;
    }
  )

  nuxtApp.provide('service', service);
})