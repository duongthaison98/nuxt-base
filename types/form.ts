export interface LoginForm {
  username: string;
  password: string;
}

export interface RegisterForm {
  username: string;
  password: string;
  email: string;
  captchaID: string;
  captchaValue: string;
}

export interface RegisterForm {
  UserName: string;
  Email: string;
  CaptchaId: string;
  CaptchaValue: string;
}

export type CurrentForm = 'login' | 'register' | 'forget_pass';