<template>
  <div class="collapse" :class="{'open': isOpened}">
    <div class="collapse__trigger" @click="switchCollapse">
      <div class="collapse__trigger__title">
        {{ title }}
      </div>
      <div class="collapse__trigger__arrow" />
    </div>
    <div v-if="isOpened" class="collapse__content">
      <slot>
        <div class="collapse__content__empty">
          Пусто
        </div>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class extends Vue {
  @Prop() title!: string

  isOpened: boolean = false

  switchCollapse () {
    this.isOpened = !this.isOpened

    if (this.isOpened) {
      this.$emit('open')
    }
  }
}
</script>

<style lang="scss" scoped>
.collapse {
  overflow: hidden;

  & + & {
    border-top: 1px solid #dcdcdc;
  }

  &__trigger {
    cursor: pointer;
    font-weight: bold;
    font-size: 20px;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    box-shadow: 0 0 5px 0 #A9A9A9;

    &__arrow {
      transition: transform .1s linear;
      width: 16px; height: 16px;
      margin-right: 4px;
      background: url(~@/assets/img/icons/right-chevron.svg) no-repeat center/16px;
      transform: rotate(90deg);
    }
  }

  &.open > &__trigger > &__trigger__arrow {
    transform: rotate(-90deg);
  }

  &__content {
    background: #f0f0f0;
    border-top: 1px solid #dcdcdc;

    &__empty {
      text-align: center;
      opacity: .5;
      padding: 15px;
    }
  }

  & .collapse {
    .collapse__trigger {
      background-color: #f0f0f0;
    }
  }
}
</style>
