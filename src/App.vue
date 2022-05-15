<template>
  <div class="container mx-auto mt-12">
    <div v-if="isGameRunning">
      <Game />
    </div>
    <div v-else>
      <MainScreen />
    </div>
  </div>
</template>

<script>
import { onBeforeMount } from 'vue';
import Game from '@components/game/Game.vue';
import MainScreen from '@components/MainScreen.vue';

import { useGameStore } from '@store/useGameStore';
import { storeToRefs } from 'pinia';

export default {
  name: 'App',
  components: {
    Game,
    MainScreen,
  },

  setup() {
    const gameStore = useGameStore();

    const { isGameRunning } = storeToRefs(gameStore);

    onBeforeMount(() => {
      gameStore.loadRecords();
    });

    return { isGameRunning };
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700&display=swap');

html,
body {
  font-size: calc(10px + 6 * ((100vw - 320px) / (1400 - 320)));
}

body {
  font-family: 'Manrope', sans-serif;
}

@media screen and (max-width: 1400px) {
  html,
  body {
    font-size: calc(10px + 4 * ((100vw - 320px) / (1400 - 320)));
  }
}
</style>
