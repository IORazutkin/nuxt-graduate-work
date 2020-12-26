<template>
  <div class="item" :class="{'warning': isWarn, 'success': task.status === 'checked'}">
    <div class="row align-items-center">
      <div class="col">
        <div class="item__title">
          {{ task.title }}
        </div>
        <div class="item__teacher">
          <span class="light">
            Преподаватель:
          </span>
          {{ task.teacher }}
        </div>
        <div v-if="task.status !== 'checked'" class="item__date">
          <span class="light">
            Срок сдачи:
          </span>
          <span class="date">
            до {{ task.date | formatDate }}
          </span>
        </div>
        <div v-else-if="task.status === 'checked'" class="item__result">
          <span class="light">
            Результат:
          </span>
          <span class="result">
            {{ task.result }}
          </span>
        </div>
      </div>
      <div v-if="task.status === 'checked'" class="col-auto">
        <button class="icon-btn download" :disabled="!task.url">
          &nbsp;
        </button>
      </div>
      <div v-if="task.status !== 'checked'" class="col-12 col-md-auto mt-2 mt-md-0">
        <button v-if="!isExpire" class="submit-btn">
          Загрузить задание
        </button>
        <div v-if="task.status === 'wait'" class="wait mt-2">
          Задание на проверке
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class extends Vue {
  @Prop() task!: any

  get isWarn () {
    // @ts-ignore
    return Math.floor((new Date(this.task.date) - new Date()) / 86400000) <= 7 && this.task.status === 'progress'
  }

  get isExpire () {
    // @ts-ignore
    return Math.floor((new Date(this.task.date) - new Date()) / 86400000) < 0
  }
}
</script>

<style lang="scss" scoped>
.item {
  background-color: white;
  padding: 15px;

  & + & {
    margin-top: 1px;
  }

  &.warning {
    background-color: #f8d7da;
    color: #721c24;

    .submit-btn {
      border: 2px solid indianred;
      color: white;
      background-color: indianred;
    }

    .date {
      font-weight: bold;
    }
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
  }

  &__title {
    font-weight: bold;
  }

  .light {
    font-weight: normal;
    opacity: .5;
  }

  .wait {
    text-align: center;
    font-weight: bold;
  }
}

.icon-btn {
  border: none;
  background-color: transparent;

  &.download {
    background-image: url(~@/assets/img/icons/download.svg);
  }

  &:disabled {
    opacity: .4;
  }
}

.submit-btn {
  @include bp-min($mq-tablet-min) {
    height: 40px; width: 250px;
  }
}
</style>
