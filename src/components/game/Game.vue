<template>
  <ModalWindowComponent :showModal="modalState" @accept="confirmEndGame" @cancel="closeModal">
    <template #body>
      <span class="text-xl text-zinc-200">Are you sure you want to end the game?</span>
    </template>
  </ModalWindowComponent>
  <LossLife />
  <button
    @click="openModal"
    class="text-xl text-rose-500 bg-rose-900 hover:text-rose-900 hover:bg-rose-500 absolute top-6 right-8 py-2 px-3 rounded-xl transition"
  >
    Exit
  </button>
  <p class="text-2xl text-zinc-200 absolute top-6 left-8">
    Rounds:
    <span class="text-emerald-500">{{ countOfRounds }}</span>
  </p>
  <ColorsPreview :color="previewColor" />
  <GameLifes />
  <div class="w-fit grid grid-cols-3 grid-rows-3 gap-12 mx-auto justify-center mt-8">
    <GamePickColorButton v-for="colorClass in shuffledColorsClasses" :key="colorClass" :color="colorClass.split('-')[0]" :colorClass="colorClass" />
  </div>
  <UserPickedPreview />
</template>

<script setup>
import LossLife from '@components/game/LossLife.vue';
import GamePickColorButton from '@/components/game/GamePickColorButton.vue';
import ColorsPreview from '@/components/game/ColorsPreview.vue';
import UserPickedPreview from '@/components/game/UserPickedPreview.vue';
import GameLifes from '@/components/game/GameLifes.vue';
import ModalWindowComponent from '@components/ModalWindowComponent.vue';
import useModalWindow from '@composables/useModalWindow';

import { useGameStore } from '@store/useGameStore';
import { storeToRefs } from 'pinia';

const gameStore = useGameStore();

const { shuffledColorsClasses, previewColor, countOfRounds } = storeToRefs(gameStore);

const endGame = function () {
  gameStore.endGame();
};

// #region modal window

const { modalState, openModal, closeModal } = useModalWindow();

const confirmEndGame = function () {
  closeModal();
  endGame();
};

//#endregion
</script>

<style lang="scss" scoped></style>
