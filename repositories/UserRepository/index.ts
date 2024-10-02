import service from "../baseRepository";
import type { RegisterForm, LoginForm } from '@/types';

const prefix = '/users/api/v2.0';

const UserRepository = {
  login(payload: LoginForm) {
    return service.post(`${prefix}/account/login/web`, payload);
  },
  getUserInfo() {
    return service.get(`/community/api/v2.0/user-info`);
  },
  getCaptcha() {
    return service.get(`${prefix}/account/captcha`);
  },
  register(payload: RegisterForm) {
    return service.post(`${prefix}/account/register`, payload);
  }
}

export default UserRepository;