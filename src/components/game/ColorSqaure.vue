<template>
  <div
    :class="{
      'red-show': color === 'red',
      'blue-show': color === 'blue',
      'indigo-show': color === 'indigo',
      'amber-show': color === 'amber',
      'emerald-show': color === 'emerald',
      'lime-show': color === 'lime',
      'cyan-show': color === 'cyan',
      'purple-show': color === 'purple',
      'orange-show': color === 'orange',
      'none-show': color === 'none',
    }"
    class="rounded-xl transition cursor-default"
  >
    <slot name="label"></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  color: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped></style>
