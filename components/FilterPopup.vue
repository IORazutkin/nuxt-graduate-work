<template>
  <button class="icon-btn filter" @click.self="isShowPopup = !isShowPopup" @pointerdown.stop="">
    <div v-if="isShowPopup" class="popup">
      <div class="input-group">
        <input
          id="onlyActive"
          type="checkbox"
        >
        <label for="onlyActive">
          Скрыть выполненные
        </label>
      </div>
      <div class="input-group">
        <v-select
          :searchable="false"
          placeholder="Сортировка"
        />
      </div>
      <div class="input-group">
        <button class="submit-btn" @click.stop="isShowPopup = false">
          Применить
        </button>
      </div>
    </div>
  </button>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import vSelect from 'vue-select'

@Component({
  components: {
    vSelect
  }
})
export default class extends Vue {
  isShowPopup: boolean = false

  mounted () {
    window.onpointerdown = () => {
      this.isShowPopup = false
    }
  }
}
</script>

<style lang="scss" scoped>
.popup {
  position: absolute;
  top: 74px; right: 0;
  padding: 16px;
  background-color: #f0f0f0;
  width: 100vw;
  z-index: 9999;
  text-align: left;
  cursor: default;
  box-shadow: 0 200vh 0 200vh rgba(0, 0, 0, .3);

  @include bp-min($mq-mobile-medium) {
    top: 75px;
    width: 400px;
    border-radius: 0 0 8px 8px;
    box-shadow: 0 -5px 0 0 #f0f0f0, 0 0 5px 0 #A9A9A9;
  }
}

.icon-btn {
  display: flex;

  &.filter {
    background-image: url(~@/assets/img/icons/filter.svg);
  }

  &.active {
    border-color: #005590;
    background-color: #005590;
    background-image: url(~@/assets/img/icons/filter_focus.svg);
  }
}
</style>
