// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    buildModules: ['@nuxt/typescript-build'],
    typescript: {
      strict: true
    },
    modules: [
      '@nuxtjs/tailwindcss',
      '@pinia/nuxt'
    ]
})
