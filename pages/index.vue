<template>
  <div class="container" style="user-select: none" @click.right.prevent="() => {}">
    <img src="/favicon.ico">
    <p>
      jwef wek kom we nio io wein
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  layout: 'empty'
})
export default class extends Vue {
}
</script>

<style>

</style>
