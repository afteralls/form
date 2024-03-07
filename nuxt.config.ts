// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['nuxt-icon', '@vueuse/nuxt', '@formkit/auto-animate/nuxt'],
  devtools: { enabled: true },
  nitro: {
    compressPublicAssets: true
  },
  css: ['@/assets/styles/main.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/styles/module.scss" as *;'
        }
      }
    }
  },
  imports: {
    dirs: ['./constants']
  },
  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [{ name: 'theme-color', content: '#f5f5f5' }],
      title: 'Form'
    }
  }
})
