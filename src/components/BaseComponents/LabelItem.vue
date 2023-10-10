<template>
  <label
    :for="props.for"
    :style="{ marginRight: props.mr + 'px' }"
    :class="$attrs.class"
  >
    {{ props.content }}
  </label>
  <br v-if="isBreakLine" />
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  for: String,
  content: String,
  mr: {
    type: [Number],
    default: null,
  },
  isBreakLine: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
label {
  background-color: #aeaeb0;
  border-radius: 3px;
  padding: 1px;
  margin-right: 15px;
  display: inline-block;
  width: 100px;
  margin-bottom: 2px;
}
</style>
