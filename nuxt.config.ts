// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || 'http://localhost:3000'
    },
  },
  experimental: {
    asyncContext: true
  },
  css: [
    '~/assets/css/main.scss'
  ],
  modules: [
    '@nuxtjs/tailwindcss', 
    'shadcn-nuxt', 
    '@nuxt/image',
    '@pinia/nuxt'
  ],
  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern"
        }
      }
    }
  },
  image: {
    dir: 'assets'
  }
})