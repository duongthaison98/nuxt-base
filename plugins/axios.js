import axios from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig() // Now we call this inside a valid context
  const token = useCookie('token').value

  const service = axios.create({
    baseURL: config.public.baseURL, // Using runtime config properly
  })  

  // Add any interceptors or global settings to the service instance
  service.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    config.data
    return config
  }, (error) => {
    return Promise.reject(error)
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

  nuxtApp.provide('service', service)
  return service
})