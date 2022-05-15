<template>
  <button
    @click="pickColor"
    :class="colorClass"
    :disabled="isPreview"
    class="text-xl disabled:text-zinc-700 disabled:bg-zinc-400 disabled:hover:text-zinc-700 disabled:hover:bg-zinc-400 font-medium w-24 h-24 rounded-xl transition"
  >
    {{ color }}
  </button>
</template>

<script setup>
import { useGameStore } from '@store/useGameStore';
import { storeToRefs } from 'pinia';

const gameStore = useGameStore();

const { isPreview } = storeToRefs(gameStore);

const props = defineProps({
  color: {
    type: String,
    required: true,
  },
  colorClass: {
    type: String,
    required: true,
  },
});

const pickColor = function () {
  gameStore.pickColor(props.color);
  gameStore.gameIsEnded();
};
</script>

<style lang="scss" scoped></style>
