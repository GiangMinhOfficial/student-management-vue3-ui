<template>
  <span v-if="isShown">
    <slot />
  </span>

  <br v-if="isBreakLine" />
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  isBreakLine: {
    default: false,
  },
  isShown: {
    default: false,
  },
});
</script>

<style scoped>
span {
  position: absolute;
  color: red;
  font-weight: bold;
}
</style>
