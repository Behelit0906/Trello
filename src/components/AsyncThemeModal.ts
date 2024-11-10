import { defineAsyncComponent } from 'vue';

const AsyncThemeModal = defineAsyncComponent(() => import('./ThemeModal.vue'))

export default AsyncThemeModal