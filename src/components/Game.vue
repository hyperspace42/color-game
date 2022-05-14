<template>
  <ColorsPreview :color="showingColor" :big="true" />
  <div class="w-fit grid grid-cols-3 grid-rows-3 gap-12 mx-auto justify-center mt-8">
    <GameSquare v-for="color in squareColors" :key="color" :color="color.split('-')[0]" :colorClass="color" />
    <button class="text-xl text-purple-200 bg-purple-900 hover:bg-purple-700 py-2 px-3 rounded-xl transition" @click="test">Start</button>
  </div>
  <UserPickedPreview />
</template>

<script setup>
import { computed } from 'vue';
import GameSquare from '@/components/GameButton.vue';
import ColorsPreview from '@components/ColorsPreview.vue';
import UserPickedPreview from '@components/UserPickedPreview.vue';

import { useGameStore } from '@store/useGameStore';
import { storeToRefs } from 'pinia';

const gameStore = useGameStore();

const { squareColors, showingColor } = storeToRefs(gameStore);

const test = function () {
  gameStore.startNewRound();
};
</script>

<style lang="scss" scoped></style>
