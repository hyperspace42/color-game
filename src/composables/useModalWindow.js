import { ref } from 'vue';

export default function useModalWindow() {
  const modalState = ref(false);

  const openModal = function () {
    modalState.value = true;
  };

  const closeModal = function () {
    modalState.value = false;
  };

  return {
    modalState,
    openModal,
    closeModal,
  };
}
