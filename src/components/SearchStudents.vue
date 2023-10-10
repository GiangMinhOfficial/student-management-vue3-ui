<template>
  <div class="mx-auto mb-5" style="width: 900px">
    <form action="" class="mx-auto row">
      <label-item class="col-sm-1" for="search" content="Tìm kiếm" />

      <div class="position col-sm-9 d-flex align-items-center">
        <div class="row">
          <div class="col-sm-7">
            <div class="row">
              <div class="col-sm-2">
                <button
                  class="btn btn-primary btn-sm"
                  @click="clearDateFilters"
                >
                  <font-awesome-icon :icon="['fas', 'filter-circle-xmark']" />
                </button>
              </div>
              <input-item type="date" class="col-sm-5" v-model="dateFrom" />
              <input-item type="date" class="col-sm-5" v-model="dateTo" />
            </div>
          </div>

          <input-item
            class="col-sm-4 ms-3"
            ref="inputRef"
            id="search"
            name="search"
            placeholder="Tìm kiếm ở đây"
            v-model="inputSearch"
          />
        </div>

        <button
          class="search-clear-btn"
          @click.prevent="clear"
          v-if="inputSearch"
        >
          <font-awesome-icon :icon="['far', 'circle-xmark']" />
        </button>
      </div>

      <button-item
        class="search-btn col-sm-1"
        content="Search"
        @onClick="search"
      />
    </form>
  </div>
</template>

<script setup>
import { ref, defineEmits, inject, watch } from 'vue';

const inputSearch = ref('');
const inputRef = ref();

// inject from App.vue
const { dateFrom, changeDateFrom } = inject('date-from');
const { dateTo, changeDateTo } = inject('date-to');
const { clearDateFilters } = inject('date-clear');

const emits = defineEmits(['input-search']);

function search() {
  inputRef.value.inputRef.focus();
  emits('input-search', inputSearch);
}

function clear() {
  inputRef.value.inputRef.focus();
  inputSearch.value = '';
}

watch(dateFrom, () => changeDateFrom(dateFrom));
watch(dateTo, () => changeDateTo(dateTo));
</script>

<style scoped>
.position {
  /* display: inline-block; */
  position: relative;
}
.search-clear-btn {
  position: absolute;
  right: 95px;
  top: 3px;

  background: transparent;
}
</style>
