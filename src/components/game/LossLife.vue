<template>
  <div class="loss_life w-full h-full absolute top-0 left-0"></div>
</template>

<script setup>
import { onMounted, watch } from 'vue';
import { useGameStore } from '@store/useGameStore';
import { storeToRefs } from 'pinia';

const gameStore = useGameStore();

const { lifes } = storeToRefs(gameStore);

onMounted(() => {
  const lossLifeNode = document.querySelector('.loss_life');
  lossLifeNode.style.opacity = 0;

  watch(lifes, () => {
    lossLifeNode.style.opacity = 1;
    setTimeout(() => (lossLifeNode.style.opacity = 0), 175);
  });
});
</script>

<style scoped>
.loss_life {
  transition: 0.175s cubic-bezier(.72,.7,.54,1.08);
  pointer-events: none;

  /* ff 3.6+ */
  background: -moz-linear-gradient(
    90deg,
    rgba(255, 0, 42, 0.35) 0%,
    rgba(255, 255, 255, 0) 7%,
    rgba(255, 255, 255, 0) 93%,
    rgba(255, 0, 42, 0.35) 100%
  );

  /* safari 5.1+,chrome 10+ */
  background: -webkit-linear-gradient(
    90deg,
    rgba(255, 0, 42, 0.35) 0%,
    rgba(255, 255, 255, 0) 7%,
    rgba(255, 255, 255, 0) 93%,
    rgba(255, 0, 42, 0.35) 100%
  );

  /* opera 11.10+ */
  background: -o-linear-gradient(
    90deg,
    rgba(255, 0, 42, 0.35) 0%,
    rgba(255, 255, 255, 0) 7%,
    rgba(255, 255, 255, 0) 93%,
    rgba(255, 0, 42, 0.35) 100%
  );

  /* ie 6-9 */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#FF002A', endColorstr='#FF002A', GradientType=0 );

  /* ie 10+ */
  background: -ms-linear-gradient(
    90deg,
    rgba(255, 0, 42, 0.35) 0%,
    rgba(255, 255, 255, 0) 7%,
    rgba(255, 255, 255, 0) 93%,
    rgba(255, 0, 42, 0.35) 100%
  );

  /* global 94%+ browsers support */
  background: linear-gradient(
    90deg,
    rgba(255, 0, 42, 0.35) 0%,
    rgba(255, 255, 255, 0) 7%,
    rgba(255, 255, 255, 0) 93%,
    rgba(255, 0, 42, 0.35) 100%
  );
}
</style>
