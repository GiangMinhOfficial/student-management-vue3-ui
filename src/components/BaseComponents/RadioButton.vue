<template>
  <input
    :type="type"
    :class="$attrs.class"
    :id="id"
    :name="name"
    :checked="isCheck"
    :value="value"
    @change="handleGender"
  />

  <br v-if="isBreakLine" />
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';

const emits = defineEmits(['update:modelValue']);

const handleGender = (e) => emits('update:modelValue', e.target.value);

const props = defineProps({
  id: {
    default: null,
  },
  type: {
    type: [String],
    default: 'text',
  },
  isBreakLine: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: null,
  },
  value: {
    type: [String, Boolean],
    default: null,
  },
  modelValue: {
    default: null,
  },
});

const isCheck = computed({
  get() {
    return props.modelValue === props.value;
  },

  set(newVal) {
    return newVal;
  },
});
</script>

<style scoped>
input {
  border-radius: 3px;
  margin-right: 15px;

  &:focus {
    outline: none;
  }
}
</style>
