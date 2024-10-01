import { useCookie, navigateTo } from 'nuxt/app';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const token = useCookie('access_token').value;
  
  if (!token && to.fullPath !== '/') {
    return navigateTo('/');
  }
  if (token && to.fullPath === '/') {
    return navigateTo('/live');
  }
})
