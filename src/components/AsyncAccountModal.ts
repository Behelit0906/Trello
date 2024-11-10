import { defineAsyncComponent } from 'vue';

const AsyncAccountModal = defineAsyncComponent(() => import('./AccountModal.vue'))

export default AsyncAccountModal