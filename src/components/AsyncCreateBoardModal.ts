import { defineAsyncComponent } from 'vue';

const AsyncCreateBoardModal = defineAsyncComponent(() => import('./CreateBoardModal.vue'))

export default AsyncCreateBoardModal