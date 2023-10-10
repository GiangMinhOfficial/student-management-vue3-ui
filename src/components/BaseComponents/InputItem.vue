<template>
  <input
    :type="type"
    :class="$attrs.class"
    ref="inputRef"
    :id="id"
    :name="name"
    :value="modelValue"
    :disabled="disabled"
    :placeholder="placeholder"
    @input="
      (e) => {
        $emit('update:modelValue', e.target.value);
      }
    "
    @click="handleClick($event.target)"
  />

  <br v-if="isBreakLine" />
</template>

<script setup>
import { defineProps, defineEmits, ref, defineExpose } from 'vue';

const inputRef = ref();
const emits = defineEmits(['update:modelValue', 'student-id']);

const handleClick = (val) => {
  if (props.type == 'checkbox') {
    emits('student-id', val);
  }
};

defineExpose({ inputRef });

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
  disabled: {
    type: Boolean,
    default: false,
  },
  placeholder: null,
});
</script>

<style scoped>
input {
  border: 2px solid rgb(245, 63, 63);
  border-radius: 3px;
  /* margin-right: 15px; */

  &:focus {
    outline: none;
  }
}
</style>
