<template>
  <button @click.prevent="$emit('onClick')">
    <slot></slot>
  </button>
</template>

<script setup>
import { defineEmits } from 'vue';

defineEmits(['onClick']);
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
