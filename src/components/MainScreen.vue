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
      class="text-xl text-zinc-200 bg-zinc-800 hover:text-zinc-300 hover:bg-zinc-700 py-2 px-3 rounded-xl transition absolute bottom-4 left-4"
    >
      Clear records
    </button>
    <a
      href="https://github.com/hyperspace42/color-game"
      target="_blank"
      class="text-xl text-zinc-200 bg-zinc-800 hover:text-zinc-300 hover:bg-zinc-700 py-2 px-3 rounded-xl transition flex items-center gap-3 absolute bottom-4 right-4"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-zinc-50" viewBox="0 0 24 24">
        <path
          d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
          fill="currentcolor"
        />
      </svg>
      Github
    </a>
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
