<template>
  <nav ref="element" class="flex justify-between items-center p-2 backdrop-blur-[200px] border-b border-white border-opacity-20 text-white text-sm dark:bg-dark">
    <div class="flex gap-1">
      <button title="More from Atlassian" class="flex justify-center items-center w-8 h-8 rounded-[3px] hover:bg-[#ffffff33]">
        <Icon icon="mdi:dots-grid" width="20" height="20" style="color: white" />
      </button>
      <a href="/" class="block h-8 px-2 relative hover:bg-[#ffffff33] rounded-[3px]">
        <div class="w-[75px] h-4 py-2 trello-icon"></div>
      </a>
    </div>
    <button @click="toggleModal" class="w-8 h-8 flex justify-center items-center rounded-full hover:bg-[#ffffff33]" title="Account">
      <span id="accountModalButton" class="flex justify-center items-center w-6 h-6 text-[10px] text-[#143758] font-bold bg-[#00A3BF] rounded-full">LS</span>
    </button>
    <Teleport to="#modal" >
      <Transition>
        <AsyncAccountModal v-if="show" @close="closeModal" />
      </Transition>
    </Teleport>
  </nav>

</template>
<script setup lang="ts">
import { Icon } from '@iconify/vue'
import AsyncAccountModal from './AsyncAccountModal'
import { ref } from 'vue'

const show = ref(false)

// Handler para abrir o cerrar modal desde el botón
const toggleModal = () => {
  if (!show.value) {
    openModal()
  } else {
    closeModal()
  }
}

// Handler para abrir el modal
const openModal = () => {
  show.value = true
}

// Handler para cerrar el modal
const closeModal = () => {
  show.value = false
}

</script>
<style scoped>
.trello-icon::before {
  content: '';
  position: absolute;
  top: 8px;
  width: 75px;
  height: 15px;
  background-image: url('../assets/trello_icon_2.gif');
  background-size: cover;
  background-position: center;
  background-position: 50%;
}

.trello-icon::after {
  content: '';
  position: absolute;
  top: 8px;
  width: 75px;
  height: 15px;
  background-image: url('../assets/trello_icon_1.gif');
  background-size: cover;
  background-position: center;
  background-position: 50%;
  opacity: 0;
}

.trello-icon:hover::before {
  opacity: 0;
}

.trello-icon:hover::after {
  opacity: 1;
}
</style>
