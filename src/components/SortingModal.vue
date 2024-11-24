<template>
  <GenericModal @close="$emit('close')" title="Your boards" button-id="sortButton" :top="160" :left="192">
    <div class="relative flex flex-col">
      <!-- Elemento activador -->
      <div @click="showMenu = !showMenu" :class="showMenu ? 'border-2 mx-[10px] border-[#0C66E4] ' : 'hover:border hover:border-black dark:hover:border-textDark hover:mx-[11px]'" class="h-10 flex justify-between items-center mx-3 mb-3 px-2 rounded  hover:bg-[#F7F8F9] dark:hover:bg-transparent hover:cursor-pointer select-none">
        {{ selectedOption }}
        <Icon icon="ri:arrow-up-s-line" width="20" height="20" rotate="90" />
      </div>

      <!-- Menú desplegable -->
      <div v-if="showMenu" class="absolute flex flex-col w-[282px] pl-[1px] py-2 left-3 -bottom-[74px] bg-white dark:bg-dark shadow-custom rounded">
        <span @click="selectOption('Sort alphabetically')" :class="selectedOption === 'Sort alphabetically' ? 'text-[#0C66E4] dark:text-[#579DFF] bg-[#E9F2FF] hover:bg-[#bcd0ec] dark:hover:bg-[#121a31] dark:bg-[#1C2B41] left-shadow' : 'hover:bg-[#0000001a] dark:hover:bg-[#ffffff15] left-shadow-hover'" class="h-8 px-3 flex items-center hover:cursor-pointer">
          Sort alphabetically
        </span>
        <span @click="selectOption('Sort by most recent')" :class="selectedOption === 'Sort by most recent' ? 'text-[#0C66E4] dark:text-[#579DFF] bg-[#E9F2FF] hover:bg-[#bcd0ec] dark:hover:bg-[#121a31] dark:bg-[#1C2B41] left-shadow' : 'hover:bg-[#0000001a] dark:hover:bg-[#ffffff15] left-shadow-hover'"  class="h-8 px-3 flex items-center hover:cursor-pointer left-shadow-hover">
          Sort by most recent
        </span>
      </div>
    </div>
  </GenericModal>

</template>
<script setup lang="ts">
import GenericModal from './GenericModal.vue'
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import { useDataStore } from '../stores/useDataStore'

const emit = defineEmits(['close'])

const dataStore = useDataStore()
const selectedOption = ref(localStorage.getItem('sortingOption') ? localStorage.getItem('sortingOption') : 'Sort by most recent')
const showMenu = ref(false)

const selectOption = (option: string) => {
  selectedOption.value = option
  dataStore.sortingBoards(option)
  emit('close')
  localStorage.setItem('sortingOption', option)
}






</script>
<style scoped>
.left-shadow-hover:hover {
  box-shadow:  -2px 0px #0C66E4;
}

.left-shadow {
  box-shadow:  -2px 0px #0C66E4;
}
</style>