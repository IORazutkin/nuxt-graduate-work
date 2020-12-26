<template>
  <div class="student">
    <div class="container">
      <search-block />
      <div class="student__result">
        <div v-if="true" class="student__result__list">
          <student-task-item v-for="task in tasks" :key="task.id" :task="task" />
        </div>
        <div v-else class="student__result__empty">
          Задания не найдены
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import StudentTaskItem from '~/components/StudentTaskItem.vue'
import SearchBlock from '~/components/SearchBlock.vue'

@Component({
  components: {
    SearchBlock,
    StudentTaskItem
  }
})
export default class extends Vue {
  tasks: any = [
    {
      id: 4,
      title: 'Практика за 4 курс',
      teacher: 'Бурнашев Рустам Арифович',
      date: '2021-05-30',
      status: 'progress',
      result: null,
      url: null
    }, {
      id: 3,
      title: 'Практика за 3 курс',
      teacher: 'Бурнашев Рустам Арифович',
      date: '2020-05-30',
      status: 'wait',
      result: 0,
      url: null
    }, {
      id: 2,
      title: 'Практика за 2 курс',
      teacher: 'Бурнашев Рустам Арифович',
      date: '2019-05-30',
      status: 'checked',
      result: 100,
      url: 'http'
    }, {
      id: 1,
      title: 'Практика за 1 курс',
      teacher: 'Медведева Ольга Анатольевна',
      date: '2018-05-30',
      status: 'checked',
      result: 100,
      url: 'http'
    }
  ]
}
</script>

<style lang="scss" scoped>
.student {
  &__result {
    background-color: #f0f0f0;
    box-shadow: 0 0 5px 0 #A9A9A9;

    @include bp-max($mq-mobile-small-max) {
      margin: 0 -15px;
      box-shadow: none;
    }

    &__empty {
      padding: 32px 15px;
      text-align: center;
      color: #A9A9A9;
    }
  }
}
</style>
