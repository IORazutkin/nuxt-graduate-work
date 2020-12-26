export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'nuxt-graduate-work',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  env: {
    API_ENDPOINT: 'http://localhost:8080'
  },

  css: [
    '~assets/scss/style.scss'
  ],

  plugins: [
    '~/plugins/vuelidate',
    '~/plugins/formatters',
    '~/plugins/axios'
  ],

  components: true,

  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/eslint-module'
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    'nuxt-babel'
  ],

  styleResources: {
    scss: [
      '~/assets/scss/_mixins.scss',
      '~/assets/scss/_style_resources.scss'
    ]
  },

  axios: {
    credentials: true,
    baseURL: 'http://localhost:8080'
  },

  router: {
  },

  server: {
    // host: '0.0.0.0',
    port: 3000
  },

  build: {
  },

  generate: {
    dir: 'C:\\Users\\igorr\\IdeaProjects\\graduate-work\\src\\main\\resources\\templates\\public'
  }
}
