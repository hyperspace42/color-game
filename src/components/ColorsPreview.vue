<template>
  <div
    :class="{
      'red-show': color === 'red',
      'blue-show': color === 'blue',
      'indigo-show': color === 'indigo',
      'amber-show': color === 'amber',
      'green-show': color === 'green',
      'white-show': color === 'white',
      'black-show': color === 'black',
      'purple-show': color === 'purple',
      'pink-show': color === 'pink',
      'none-show': color === 'none',
      'w-32 h-32 flex items-center justify-center mx-auto': big,
      'w-16 h-16': !big,
    }"
    class="text-2xl rounded-xl transition cursor-default"
  >
    <span v-if="color !== 'none' && big">
      {{ color }}
    </span>
  </div>
</template>

<script setup>
const props = defineProps({
  color: {
    type: String,
    required: true,
  },
  big: {
    type: Boolean,
    required: true,
  },
});
</script>

<style scoped></style>
