import service from "../baseRepository";
import type { RegisterForm, LoginForm } from '@/types';

const prefix = '/users/api/v2.0';

export const login = (payload: LoginForm) => {
  return service.post(`${prefix}/account/login/web`, payload);
}
export const getUserInfo = () => {
  return service.get(`/community/api/v2.0/user-info`);
}
export const getCaptcha = () => {
  return service.get(`${prefix}/account/captcha`);
}
export const register = (payload: RegisterForm) => {
  return service.post(`${prefix}/account/register`, payload);
}