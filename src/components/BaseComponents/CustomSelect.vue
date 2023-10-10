<template>
  <select v-model="selected" @change="emits('select-khoa', selected)" :id="id">
    <option disabled value="">Please select one</option>

    <option v-for="khoa in props.khoas" :key="khoa.maKhoa" :value="khoa.maKhoa">
      {{ khoa.tenKhoa }}
    </option>
  </select>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue';

const selected = ref('');
const emits = defineEmits(['select-khoa']);

const props = defineProps({
  khoas: null,
  modelValue: {
    default: () => {},
  },
  id: null,
});

watch(
  () => props.modelValue,
  (newModelValue) => {
    if (newModelValue) {
      selected.value = newModelValue.maKhoa;
    } else {
      selected.value = '';
    }
  },
);

// watch(selected, (newSelected) => {
//   emits('select-khoa', newSelected);
// });
</script>
