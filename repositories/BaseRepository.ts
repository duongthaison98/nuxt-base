import axios, { type AxiosInstance, AxiosError } from "axios";
import { useRuntimeConfig, useCookie, refreshCookie } from 'nuxt/app';

const config = useRuntimeConfig();

class BaseRepository {
  private $axios: AxiosInstance | null;
  
  constructor() {
    this.$axios = null;
  }

  createService() {
    this.$axios = axios.create({
      baseURL: config.public.baseURL,
    })  
  
    this.$axios.interceptors.request.use((config: any) => {
      const accessToken = useCookie('access_token').value;
      const refreshToken = useCookie('refresh_token').value;
    
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      config.data;
      
      return config;
    }, (error: AxiosError) => {
      return Promise.reject(error);
    })
  
    this.$axios.interceptors.response.use(
      (response: any) => {
        return response.data;
      },
      (error: AxiosError) => {
        const { response } = error;
    
        throw response;
      }
    )
  }

  async get(url: string, params?: object) {
    try {      
      const response = await this.$axios?.get(url, { params });
      return response;
    } catch (error: any) {
      console.log(error);
    }
  }

  async post(url: string, data?: object) {
    try {
      const response = await this.$axios?.post(url, data);
      return response;
    } catch (error: any) {
      console.log(error);
    }
  }

  async put(url: string, data?: object) {
    try {
      const response = await this.$axios?.put(url, data);
      return response;
    } catch (error: any) {
      console.log(error);
    }
  }

  async delete(url: string, data?: object) {
    try {
      const response = await this.$axios?.delete(url, data);
      return response;
    } catch (error: any) {
      console.log(error);
    }
  }
}

const service = new BaseRepository();
service.createService();

export default service;