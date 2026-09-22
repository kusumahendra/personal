// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  app: {
    // Set NUXT_APP_BASE_URL=/<repo-name>/ when deploying to a GitHub project page
    baseURL: process.env.NUXT_APP_BASE_URL || '/'
  },
  ssr: true,
  nitro: {
    prerender: {
      routes: ['/']
    }
  }
})