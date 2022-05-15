<template>
  <div v-show="showModal" @click="cancel" class="modal_backdrop flex justify-center items-center absolute top-0 left-0 w-full h-full">
    <div @click.stop class="modal_window bg-zinc-700 w-fit h-fit p-6 rounded-xl">
      <div class="modal_window_header flex justify-end">
        <button @click="cancel" class="text-red-500 hover:text-red-600 hover:rotate-90 transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="modal_body mt-4">
        <slot name="body">
          <span class="text-xl text-zinc-200">Empty</span>
        </slot>
      </div>
      <div v-if="showFooter" class="modal_footer mt-6">
        <div class="ml-auto flex flex-row items-center justify-end gap-4">
          <button
            @click="accept"
            class="text-xl text-green-900 bg-green-500 hover:text-green-500 hover:bg-green-900 py-2 px-3 rounded-xl transition"
          >
            Accept
          </button>
          <button
            @click="cancel"
            class="text-xl text-red-900 bg-red-500 hover:text-red-500 hover:bg-red-900 py-2 px-3 rounded-xl transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['accept', 'cancel']);

const props = defineProps({
  showModal: {
    type: Boolean,
    default: false,
  },
  showFooter: {
    type: Boolean,
    default: true,
  },
});

const accept = function () {
  emit('accept');
};

const cancel = function () {
  emit('cancel');
};
</script>

<style scoped>
.modal_backdrop {
  background: #00000050;
}
</style>
