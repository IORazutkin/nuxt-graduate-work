<template>
  <div class="teacher">
    <div class="container">
      <search-block />
      <div class="teacher__result">
        <div class="teacher__result__list">
          <div class="teacher__result__list__item-add" @click="$router.push('/teacher/new')">
            <div class="row justify-content-center align-items-center">
              <div class="col-auto">
                <img class="image" src="~/assets/img/icons/add.svg" width="35" height="35">
              </div>
              <div class="col-auto text">
                Создать&nbsp;задание
              </div>
            </div>
          </div>
          <template v-if="tasks.length > 0">
            <teacher-task-item v-for="task in tasks" :key="task.id" :task="task" />
          </template>
          <div v-else class="teacher__result__list__empty">
            Задания не найдены
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import SearchBlock from '~/components/SearchBlock.vue'
import TeacherTaskItem from '~/components/TeacherTaskItem.vue'
import { Practice } from '~/types/Practice'

@Component({
  components: {
    TeacherTaskItem,
    SearchBlock
  }
})
export default class extends Vue {
  tasks!: Practice[]

  asyncData (context: any) {
    return context.$axios.$get('/api/practice').then((response: any) => {
      return {
        tasks: response
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.teacher {
  &__result {
    background-color: #f0f0f0;
    box-shadow: 0 0 5px 0 #A9A9A9;

    @include bp-max($mq-mobile-small-max) {
      margin: 0 -15px;
      box-shadow: none;
    }

    &__list {
      &__item-add {
        padding: 30px 15px;
        background-color: white;
        margin-bottom: 1px;
        font-weight: bold;
        color: #005590;
        cursor: pointer;
        transition: all 0.1s linear;

        .text {
          transition: all 0.1s linear;
          padding: 0;
        }

        .image {
          transition: all 0.1s linear;
        }

        @include bp-max($mq-mobile-max) {
          background-color: #005590;

          .text {
            color: white;
          }

          .image {
            filter: brightness(0) invert(1);
          }
        }

        @include bp-min($mq-tablet-min) {
          &:hover {
            background-color: #005590;

            .text {
              color: white;
            }

            .image {
              filter: brightness(0) invert(1);
            }
          }
        }
      }

      &__empty {
        padding: 32px 15px;
        text-align: center;
        color: #A9A9A9;
      }
    }
  }
}
</style>
