import type { NuxtApp } from 'nuxt/app';
import type { AxiosInstance } from 'axios'; 

interface RequestOptions {
  method: 'get' | 'post' | 'put' | 'delete';
  params?: Record<string, any>;
  data?: Record<string, any>;
}

export default defineNuxtPlugin((nuxtApp: NuxtApp) => {
  const useAxios = (url: string, options: RequestOptions) => {
    const service = nuxtApp.$service as AxiosInstance;
    
    return service({
      url,
      method: options.method,
      params: options.params,
      data: options.data,
    });
  }

  nuxtApp.provide("useAxios", useAxios);
})
