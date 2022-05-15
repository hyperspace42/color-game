<template>
  <div class="w-9/12 mx-auto flex flex-row flex-wrap items-center justify-center gap-4 mt-6">
    <ColorSqaure v-for="(color, index) in userPickedColorStack" :key="color + index" :color="color" class="w-8 h-8"/>
  </div>
</template>

<script setup>
import { useGameStore } from '@store/useGameStore';
import { storeToRefs } from 'pinia';
import ColorSqaure from '@components/game/ColorSqaure.vue'

const gameStore = useGameStore();
const { userPickedColorStack } = storeToRefs(gameStore);
</script>

<style lang="scss" scoped></style>
