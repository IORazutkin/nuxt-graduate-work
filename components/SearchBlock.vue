<template>
  <div class="search-block">
    <div class="row">
      <div class="col">
        <div class="input-group">
          <input
            type="tel"
            class="field search"
            placeholder="Поиск"
            autocomplete="off"
          >
        </div>
      </div>
      <div class="col-auto">
        <filter-popup />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import FilterPopup from '~/components/FilterPopup.vue'

@Component({
  components: {
    FilterPopup
  }
})
export default class extends Vue {
}
</script>

<style lang="scss" scoped>
.search-block {
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

.field {
  &.search {
    background-image: url(~@/assets/img/icons/search.svg);

    &:focus {
      background-image: url(~@/assets/img/icons/search_focus.svg);
    }
  }
}
</style>
