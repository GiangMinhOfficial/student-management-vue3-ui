<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-end">
      <li class="page-item" :class="{ disabled: isPrevious }">
        <a
          class="page-link"
          href="#"
          @click="
            () => {
              currentPage -= 1;
              changePage(currentPage);
            }
          "
          >Previous</a
        >
      </li>

      <template v-for="pageIndex in totalPage" :key="pageIndex">
        <li
          class="page-item"
          :class="{ active: pageIndex == currentPage }"
          @click="
            () => {
              currentPage = pageIndex;
              changePage(pageIndex);
            }
          "
        >
          <a class="page-link" href="#">{{ pageIndex }}</a>
        </li>
      </template>

      <li class="page-item" :class="{ disabled: isNext }">
        <a
          class="page-link"
          href="#"
          @click="
            () => {
              currentPage += 1;
              changePage(currentPage);
            }
          "
          >Next</a
        >
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { computed, inject, ref, watch } from 'vue';

global.jQuery = require('jquery');
require('bootstrap');

const { totalPage, changePage, searchString } = inject('totalPage');

const currentPage = ref(1);
const isPrevious = computed(() => {
  return currentPage.value <= 1;
});
const isNext = computed(() => {
  return currentPage.value >= totalPage.value;
});

watch(searchString, () => {
  currentPage.value = 1;
});
</script>

<style scoped></style>
