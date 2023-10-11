<template>
  <select
    v-model="selected"
    @change="emits('select-khoa', selected)"
    :id="id"
    :class="$attrs.class"
  >
    <option disabled value="">{{ disabledOption }}</option>

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
  disabledOption: null,
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
</script>
