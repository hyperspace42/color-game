<template>
  <div class="w-full h-32">
    <div
      :class="{
        'red-show': showingColor === 'red',
        'blue-show': showingColor === 'blue',
        'indigo-show': showingColor === 'indigo',
        'amber-show': showingColor === 'amber',
        'green-show': showingColor === 'green',
        'white-show': showingColor === 'white',
        'black-show': showingColor === 'black',
        'purple-show': showingColor === 'purple',
        'pink-show': showingColor === 'pink',
        'none-show': showingColor === 'none',
      }"
      id="preview"
      class="text-2xl flex items-center justify-center mx-auto w-32 h-32 rounded-xl transition cursor-default"
    >
      <span v-if="showingColor !== 'none'">
        {{ showingColor }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from '@store/useGameStore';
import { storeToRefs } from 'pinia';

const gameStore = useGameStore();
const { showingColor, transition } = storeToRefs(gameStore);
</script>

<style scoped>

</style>
