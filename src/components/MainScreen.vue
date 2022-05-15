<template>
  <main>
    <p class="text-3xl text-zinc-200 text-center">Welcome to my color game<span class="text-orange-500">!</span></p>
    <div class="text-center mt-10">
      <button
        @click="startGame"
        class="text-2xl text-purple-900 bg-purple-500 hover:text-purple-500 hover:bg-purple-900 py-2 px-3 rounded-xl transition"
      >
        Start
      </button>
    </div>
    <div class="main mt-6">
      <div class="w-full records flex flex-col mt-6">
        <p class="text-3xl text-zinc-200">You records:</p>
        <div v-if="records.length" class="records_table grid grid-cols-1 mt-8">
          <div
            v-for="(record, index) in clicedRecords"
            :key="record + index"
            class="record_row text-xl text-zinc-300 w-full flex flex-row justify-between"
          >
            <span class="record_row_date">
              {{ getRecordValues(record)[1] }}
            </span>
            <span :class="{ 'text-amber-500': index === 0 }" class="record_row_value flex flex-row items-center">
              {{ getRecordValues(record)[0] }}
              <svg
                v-if="index === 0"
                xmlns="http://www.w3.org/2000/svg"
                class="w-8 h-8 text-amber-500"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 6l4 6l5 -4l-2 10h-14l-2 -10l5 4z" />
              </svg>
            </span>
          </div>
        </div>
        <div v-else class="mt-4">
          <span class="text-2xl text-zinc-300">You don't have any records</span>
        </div>
      </div>
      <img class="game_screenshot w-9/12 mx-auto mt-4" src="../assets/previewScreenshot.png" alt="" />
    </div>
  </main>
</template>

<script setup>
import { computed } from 'vue';
import { useGameStore } from '@store/useGameStore';
import { storeToRefs } from 'pinia';

const gameStore = useGameStore();

const { records } = storeToRefs(gameStore);

const getRecordValues = function (record) {
  const recordArr = record.split(' ');
  return [recordArr[0], recordArr.slice(1, recordArr.length).join(' ')];
};

const sortedRecords = computed(() => {
  return records.value.sort((a, b) => {
    return getRecordValues(b)[0] - getRecordValues(a)[0];
  });
});

const clicedRecords = computed(() => {
  return sortedRecords.value.slice(0, 20);
});

const startGame = function () {
  gameStore.startGame();
};
</script>

<style scoped>
.main {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.records_table {
  width: 50%;
}

.record_row {
  grid-gap: 4rem;
}

@media screen and (max-width: 1280px) {
  .main {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
  }

  .records {
    text-align: center;
  }

  .records_table {
    width: 35%;
    margin-left: auto;
    margin-right: auto;
  }

  .record_row {
    margin-left: auto;
    margin-right: auto;
  }

  .record_row_date {
    place-self: start;
  }

  .record_row_value {
    place-self: end;
  }

  img {
    display: none;
  }
}

@media screen and (max-width: 620px) {
  .records_table {
    width: 55%;
  }
}
</style>
