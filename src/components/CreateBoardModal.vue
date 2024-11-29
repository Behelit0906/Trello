<template>
  <section ref="element" class="absolute top-28 left-[260px] w-[304px] h-[460px] bg-white dark:bg-dark dark:text-textDark text-dynamicTextColor rounded transition-colors">
    <header class="relative px-3 pt-6 mb-3">
      <h2 class="mb-8 text-center text-sm font-medium">Create board</h2>
      <button class="absolute flex items-center justify-center w-8 h-8 right-2 top-2 hover:bg-[#DCDFE4] dark:hover:bg-[#ffffff33]  rounded">
        <Icon @click="$emit('close')" icon="material-symbols:close" width="16" height="16" class="dark:text-textDark text-dynamicTextColor" />
      </button>
    </header>
    <div class="flex flex-col items-center px-3">
      <div :class="selectedBackground" class="w-[200px] h-[120px] mb-6 flex justify-center items-center rounded bg-cover">
        <img src="../assets/board.svg" alt="board-icon">
      </div>
      <div class="flex flex-col w-full gap-2">
        <h3 class="text-xs font-medium">Backgrounds</h3>
        <div class="flex justify-between">
          <div 
            v-for="background in backgrounds" 
            :key="background" 
            class="w-16 h-10 mb-5 rounded overflow-hidden bg-cover cursor-pointer"
            :class= "background !== selectedBackground ? `${background} hover:brightness-75`:`${background}`"
            @click="() => selectedBackground = background"
            >
            <span class="flex items-center justify-center w-full h-full filter brightness-100" v-if="background === selectedBackground">
                <Icon icon="material-symbols:check" width="20" height="20" style="color: white" />
            </span>
          </div>
        </div>
        <div>
          <h3 class="mb-1 text-xs font-medium after:content-['*'] after:text-red-700 after:ml-[2px]">Board title</h3>
          <div class="mb-3">
            <input ref="target" v-on:focus="" v-model="title" type="text" class="w-full h-9 py-2 px-3 mb-1 dark:bg-[#282E33] text-sm border border-black dark:border-[#9FADBC] rounded">
            <span v-if="showRequiredTitleMessage" class="text-sm">
              👋 Board title is required
            </span>
          </div>
          <button @click="createBoard" :disabled="title === ''" class="w-full h-9 rounded bg-[#0c66e4] dark:bg-[#579DFF] hover:bg-[#0055CC] dark:hover:bg-[#85b8ff] text-sm text-white dark:text-[#1D2125] disabled:dark:bg-[#bcd6f00a] disabled:dark:text-[#bfdbf847] disabled:dark:hover:bg-[#bcd6f00a] disabled:cursor-not-allowed disabled:text-[#091e424f] disabled:bg-[#091e4208]">
            Create
          </button>
        </div>
        
      </div>
    </div>

  </section>
</template>
<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useFocus, onClickOutside } from '@vueuse/core'
import { ref, watch } from 'vue'
import { useDataStore } from '../stores/useDataStore'

const backgrounds = ref(['bg-1', 'bg-2', 'bg-3', 'bg-4'])
const selectedBackground = ref('bg-1')
const title = ref('')
const target = ref(null)
const { focused } = useFocus(target)
const showRequiredTitleMessage = ref(false)
const dataStore = useDataStore()
const emit = defineEmits(['close'])
const element = ref(null)

const createBoard = () => {
  dataStore.createBoard(title.value, selectedBackground.value)
  emit('close')
}

watch([focused, title], (focused) => {
  if(focused && title.value === '') {
    showRequiredTitleMessage.value = true
  }
  else showRequiredTitleMessage.value = false
})

const onClickOutsideHandler = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  console.log(target)
  if(target.id === 'addBoardButton') return;
  emit('close')
}

onClickOutside(element, onClickOutsideHandler)

</script>