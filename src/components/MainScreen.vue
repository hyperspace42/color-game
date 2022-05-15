<template>
  <ModalWindowComponent :showModal="modalState" @accept="clearRecords" @cancel="closeModal">
    <template #body>
      <span class="text-xl text-zinc-200">Are you sure you want to delete all your records?</span>
    </template>
  </ModalWindowComponent>
  <main>
    <p class="text-3xl text-zinc-200 text-center">Welcome to my color game<span class="text-orange-500">!</span></p>
    <div class="text-center mt-10">
      <button
        @click="startGame"
        class="text-2xl text-green-900 bg-green-500 hover:text-green-500 hover:bg-green-900 py-2 px-3 rounded-xl transition"
      >
        Start
      </button>
    </div>
    <div class="main mt-6">
      <RecordsTable />
      <img class="game_screenshot w-9/12 mx-auto mt-4" src="../assets/previewScreenshot.png" alt="" />
    </div>
    <button
      v-if="records.length"
      @click="openModal"
      class="text-xl text-zinc-200 bg-zinc-700 hover:text-zinc-300 hover:bg-zinc-600 py-2 px-3 rounded-xl transition absolute bottom-4 left-4"
    >
      Clear records
    </button>
  </main>
</template>

<script setup>
import RecordsTable from '@components/RecordsTable.vue';
import ModalWindowComponent from '@components/ModalWindowComponent.vue';
import useModalWindow from '@composables/useModalWindow';

import { useGameStore } from '@store/useGameStore';
import { storeToRefs } from 'pinia';

const gameStore = useGameStore();

const { records } = storeToRefs(gameStore);

const startGame = function () {
  gameStore.startGame();
};

const { modalState, openModal, closeModal } = useModalWindow();

const clearRecords = function () {
  gameStore.clearRecords();
  closeModal();
};
</script>

<style scoped>
.main {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

@media screen and (max-width: 1280px) {
  .main {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
  }

  img {
    display: none;
  }
}
</style>
