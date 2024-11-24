import { defineAsyncComponent } from 'vue';

const AsyncDeleteBoardModal = defineAsyncComponent(() => import('./DeleteBoardModal.vue'))

export default AsyncDeleteBoardModal