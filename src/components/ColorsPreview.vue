<template>
  <ColorSqaure :color="color" class="text-2xl w-32 h-32 flex items-center justify-center mx-auto">
    <template v-if="color !== 'none'" #label>
      <span>{{ color }}</span>
    </template>
  </ColorSqaure>
</template>

<script setup>
import ColorSqaure from '@components/ColorSqaure.vue';

const props = defineProps({
  color: {
    type: String,
    required: true,
  },
});
</script>

<style scoped></style>
