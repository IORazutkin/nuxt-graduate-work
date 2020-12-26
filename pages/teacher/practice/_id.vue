<template>
  <div class="practice">
    <div class="container">
      <div class="practice__header">
        <div>
          <h1 class="practice__header__title">
            {{ practice.title }}
          </h1>
        </div>
        <button class="practice__header__edit">
          &nbsp;
        </button>
      </div>
      <div class="practice__content">
        <collapse title="Список тем" />
        <collapse title="Список работ" @open.once="loadWorkList">
          <preloader v-if="!groupList" />
          <template v-else>
            <collapse v-for="(value, key) in groupList" :key="key" :title="key" :val="value">
              <div v-for="item in value" :key="item.id.student.user.user.id" class="practice-item">
                {{ item.id.student.user.user.fullName }}
              </div>
            </collapse>
          </template>
        </collapse>
        <collapse title="Материалы" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Practice } from '~/types/Practice'
import Collapse from '~/components/Collapse.vue'
import Preloader from '~/components/Preloader.vue'

@Component({
  components: { Preloader, Collapse }
})
export default class extends Vue {
  practice!: Practice
  groupList: any = null

  asyncData (context: any) {
    return context.$axios.$get('/api/practice/' + context.params.id).then((response: any) => {
      return {
        practice: response
      }
    })
  }

  loadWorkList () {
    this.$axios.$post('/api/student-practice', this.practice).then((response: any) => {
      this.groupList = response
    })
  }
}
</script>

<style lang="scss" scoped>
.practice {
  &__header {
    margin-top: 32px;
    padding: 15px;
    background-color: #f0f0f0;
    box-shadow: 0 0 5px 0 #A9A9A9;
    display: flex;
    justify-content: space-between;

    &__title {
      margin: 0;
      font-size: 24px;

      @include bp-max($mq-mobile-max) {
        font-size: 20px;
      }
    }

    &__edit {
      padding: 0;
      width: 42px;
      background: transparent url(~@/assets/img/icons/edit.svg) no-repeat center/24px;
      border: none;
      outline: none;
    }
  }

  &__content {
    margin-top: 16px;
    box-shadow: 0 0 5px 0 #A9A9A9;

    .practice-item {
      padding: 15px 15px 15px 15px;
      font-weight: bold;
      cursor: pointer;
    }
  }
}
</style>
