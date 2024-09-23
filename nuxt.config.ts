// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  runtimeConfig: {
    // Public variables (available on both server and client)
    public: {
      baseURL: process.env.BASE_URL || 'http://localhost:3000',
    },
  }
})
