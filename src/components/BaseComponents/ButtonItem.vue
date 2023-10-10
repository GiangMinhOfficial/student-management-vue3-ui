<template>
  <button @click.prevent="$emit('onClick')">
    {{ props.content }}
  </button>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineEmits(['onClick']);

const props = defineProps({
  content: String,
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
