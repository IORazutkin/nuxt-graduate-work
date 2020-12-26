<template>
  <div class="item" @click="$router.push('/teacher/practice/' + task.id)">
    <div class="row align-items-center">
      <div class="col">
        <div class="item__title">
          {{ task.title }}
        </div>
        <div class="item__date">
          <span class="light">
            Срок сдачи:
          </span>
          <span class="date">
            до {{ task.finishDate | formatDate }}
          </span>
        </div>
      </div>
      <div class="col-auto">
        <button class="icon-btn">
          &nbsp;
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Practice } from '~/types/Practice'

@Component
export default class extends Vue {
  @Prop() task!: Practice
}
</script>

<style lang="scss" scoped>
.item {
  background-color: white;
  padding: 15px;
  cursor: pointer;

  & + & {
    margin-top: 1px;
  }

  &.success {
    background-color: #d4edda;
    color: #155724;

    .item__date {
      display: none;
    }

    .result {
      font-weight: bold;
    }

    .icon-btn {
      background-color: #155724;
    }
  }

  &__title {
    font-weight: bold;
  }

  .light {
    font-weight: normal;
    opacity: .5;
  }

  &:hover {
    background-color: #f4fdff;

    .icon-btn {
      opacity: 1;
    }
  }
}

.icon-btn {
  mask: url(~@/assets/img/icons/right-chevron.svg) no-repeat center/50%;
  background-color: #212529;
  opacity: .5;
  border: none;
  width: 36px;
  transition: opacity 0.1s linear;
}
</style>
