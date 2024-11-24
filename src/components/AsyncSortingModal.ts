import { defineAsyncComponent } from 'vue';

const AsyncSortingModal = defineAsyncComponent(() => import('./SortingModal.vue'))

export default AsyncSortingModal