<template>
  <div class="page">
    <header class="header">
      <div class="container">
        <div class="row justify-content-between">
          <div class="col-auto header__logo">
            <a href="/">
              <img class="header__logo__img d-none d-md-block" src="~/assets/img/kpfu_logo.svg" alt="Логотип КФУ">
              <img class="header__logo__img d-md-none" src="~/assets/img/kpfu_logo_mobile.svg" alt="Логотип КФУ">
            </a>
          </div>
          <button v-if="$route.path !== '/login'" class="header__logout" @click="logout">
            Выход
          </button>
        </div>
      </div>
    </header>
    <main class="main">
      <nuxt />
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class extends Vue {
  logout () {
    this.$axios.$get('/logout').then(() => {
      this.$router.push('/login')
    })
  }
}
</script>

<style lang="scss" scoped>
$header-background-color: #005590;
$header-padding: 12px 0;
$header-padding-md: 16px 0;
$header-image-height: 36px;
$header-image-height-md: 52px;

.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  padding: $header-padding-md;
  background-color: $header-background-color;

  @include bp-max($mq-mobile-max) {
    padding: $header-padding;
  }

  &__logo {
    &__img {
      height: $header-image-height-md;

      @include bp-max($mq-mobile-max) {
        height: $header-image-height;
      }
    }
  }
}

.main {
  flex-grow: 1;
  display: flex;

  & > * {
    flex-basis: 100%;
  }
}
</style>
