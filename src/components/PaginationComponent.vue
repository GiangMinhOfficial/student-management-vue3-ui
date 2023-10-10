<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-end">
      <li
        class="page-item"
        :class="{ disabled: isPrevious }"
        @click="changePre"
      >
        {{ isPrevious }}
        <a class="page-link" href="#">Previous</a>
      </li>

      <template v-for="id in props.totalPage" :key="id">
        <li class="page-item" @click="changePage(id)">
          <a class="page-link" href="#">{{ id }}</a>
        </li>
      </template>

      <li class="page-item"><a class="page-link" href="#">Next</a></li>
    </ul>
  </nav>
</template>

<script setup>
import { computed, defineProps, defineEmits, onMounted, ref } from 'vue';

global.jQuery = require('jquery');
require('bootstrap');

const emits = defineEmits(['page-index']);
const currentPage = ref(1);

// const tabIndex = ref(0);

const isPrevious = computed(() => {
  return currentPage.value > 1;
});

// const isNext = computed(() => {
//   return currentPage.value < props.totalPage;
// });

const changePage = (id) => {
  currentPage.value = id;
  emits('page-index', id);
};

const changePre = () => {
  emits('page-index', currentPage.value - 1);
};

const props = defineProps({
  totalPage: null,
});

onMounted(() => {
  console.log(props.totalPage);
});
</script>

<style scoped>
@import '~bootstrap/dist/css/bootstrap.css';
</style>
