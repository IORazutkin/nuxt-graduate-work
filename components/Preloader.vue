<template>
  <div class="preloader">
    <div class="preloader__wheel" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class extends Vue {
}
</script>

<style lang="scss" scoped>
.preloader {
  display: flex;
  justify-content: center;

  &__wheel {
    width: 32px; height: 32px;
    border: 3px solid #005590;
    border-right-color: transparent;
    border-radius: 50%;
    animation: load 1s linear infinite;
  }
}
</style>
