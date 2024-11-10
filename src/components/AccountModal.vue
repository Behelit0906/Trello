<template>
  <div ref="element" class="absolute flex flex-col gap-2 w-[304px] py-6 top-12 right-1 text-[#626F86] bg-white rounded-lg shadow-sm">
    <div class="px-3">
      <div class="flex flex-col gap-3 pb-4 px-2 border-b border-slate-200">
        <h2 class="text-[11px]">ACCOUNT</h2>
        <div class="flex gap-2 items-center text-xs text-[#626F86]">
          <span class="flex justify-center items-center w-10 h-10 text-base text-[#143758] font-bold bg-[#00A3BF] rounded-full">LS</span>
          <div class="flex flex-col gap-[2px]">
            <p>Luis Salcedo</p>
            <p>luis.salcedo0906@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h2 class="flex items-center pl-5 h-9 text-[11px]">TRELLO</h2>
      <ul>
        <li>
          <button 
            :class="colorClass"
            @click="clickHandler" 
            class="flex justify-between items-center w-full h-9 px-5 text-left ">
            Theme
            <Icon icon="weui:arrow-filled" width="20" height="20" style="color: #44546F" />
          </button>
        </li>
      </ul>
    </div>
    <Teleport to="#modal">
      <Transition>
        <AsyncThemeModal v-if="show" />
      </Transition>
    </Teleport>
  </div>

</template>
<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import AsyncThemeModal from './AsyncThemeModal'
import { onClickOutside } from '@vueuse/core'
const emit = defineEmits(['close'])


const colorClass = ref('hover:bg-[#0000001a]');
const show = ref(false)
const element = ref(null)

const clickHandler = () => {
  colorClass.value = colorClass.value === 'hover:bg-[#0000001a]' ? 'text-[#0C66E4] bg-[#E9F2FF]' : 'hover:bg-[#0000001a]'
  show.value = !show.value
}

const onClickOutsideHandler = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  const themeModal = document.querySelector('#themeModal')
  
  if(target.id=== 'accountModalButton') return
  else if(target === themeModal || themeModal && themeModal.contains(target)) return
  else if(show.value) show.value = !show.value
  else emit('close')
}


onClickOutside(element, onClickOutsideHandler)

</script>