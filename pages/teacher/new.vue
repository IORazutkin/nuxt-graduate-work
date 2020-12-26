<template>
  <div class="new-task">
    <div class="container">
      <form class="new-task__form" @submit.prevent="getGroups">
        <div class="row">
          <div class="col-12 col-md-8">
            <div class="input-group" :class="{'error': $v.formData.title.$error}">
              <input
                v-model="$v.formData.title.$model"
                type="text"
                class="field no-icon"
                placeholder="Название темы"
              >
            </div>
          </div>
          <div class="col-12 col-md-4 mt-3 mt-md-0">
            <div class="input-group" :class="{'error': $v.formData.finishDate.$error}">
              <input
                v-model="$v.formData.finishDate.$model"
                v-mask="'##.##.####'"
                type="tel"
                class="field no-icon"
                placeholder="Срок выполнения"
                @input="$v.formData.finishDate.$reset"
              >
            </div>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-12 col-md-6">
            <div class="input-group" :class="{'error': $v.formData.institute.$error}">
              <v-select
                v-model="$v.formData.institute.$model"
                :options="$store.getters['institute/getList']"
                label="title"
                class="no-icon"
                placeholder="Институт"
              >
                <template #no-options>
                  Совпадений не найдено
                </template>
              </v-select>
            </div>
          </div>
          <div class="col-12 col-md-6 mt-3 mt-md-0">
            <div class="input-group" :class="{'error': $v.formData.course.$error}">
              <v-select
                v-model="$v.formData.course.$model"
                :disabled="!formData.institute"
                :options="$store.getters['course/getList']"
                label="title"
                class="no-icon"
                placeholder="Направление"
              >
                <template #no-options>
                  Совпадений не найдено
                </template>
              </v-select>
            </div>
          </div>
          <div class="col-12 mt-3">
            <button class="submit-btn">
              Показать список групп
            </button>
          </div>
        </div>
      </form>
      <div class="new-task__list">
        <template v-if="true">
          <div v-for="group in $store.getters['group/getList']" :key="group.id" class="new-task__list__item">
            <input :id="'group' + group.id" v-model="selectedGroups" type="checkbox" :value="group">
            <label :for="'group' + group.id">{{ group.num }}</label>
          </div>
        </template>
        <div v-else class="new-task__list__empty">
          Группы не найдены
        </div>
      </div>
      <div v-if="selectedGroups.length" class="row mt-3">
        <div class="col-12 col-md-6 col-lg-4 offset-md-6 offset-lg-8">
          <button class="submit-btn" @click="createTask">
            Создать задание
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { mask } from 'vue-the-mask'
import { required } from 'vuelidate/lib/validators'
import vSelect from 'vue-select'

@Component({
  components: {
    vSelect
  },
  directives: {
    mask
  }
})
export default class extends Vue {
  formData: any = {
    title: '',
    finishDate: '',
    institute: null,
    course: null
  }

  selectedGroups: any = []

  asyncData (context: any) {
    return context.store.dispatch('institute/getList')
  }

  @Watch('formData', { deep: true })
  formDataChangeHandler () {
    if (this.formData.institute) {
      this.$store.dispatch('course/getList', this.formData.institute)
    }
  }

  getGroups () {
    this.$v.formData.$touch()

    if (this.$v.formData.$error) {
      return
    }

    this.$store.dispatch('group/getList', this.formData.course)
  }

  createTask () {
    this.$axios.$post('/api/practice', {
      title: this.formData.title,
      finishDate: this.formData.finishDate.split('.').reverse().join('-'),
      groupList: this.selectedGroups
    }).then((response: any) => {
      this.$router.replace('/teacher/practice/' + response.id)
    })
  }

  validations () {
    return {
      formData: {
        title: {
          required
        },
        finishDate: {
          required,
          isValid (val: string) {
            return /^\d\d\.\d\d\.\d\d\d\d$/.test(val)
          },
          isTrueDate: (date: string) => {
            const d = new Date(date.split('.').reverse().join('-'))
            return +date.substr(0, 2) === d.getDate()
          }
        },
        institute: {
          required
        },
        course: {
          required
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.new-task {
  &__form {
    margin: 32px 0 16px;
    background-color: #f0f0f0;
    padding: 15px;
    border-radius: 8px 8px 0 0;
    box-shadow: 0 0 5px 0 #A9A9A9;
    z-index: 1;

    @include bp-max($mq-mobile-small-max) {
      margin: 0 -15px 2px;
      box-shadow: none;
    }
  }

  &__list {
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

    &__item {
      background-color: white;
      color: #212529;
      font-weight: bold;

      label {
        padding: 15px;
      }

      & + & {
        margin-top: 1px;
      }
    }
  }
}
</style>
