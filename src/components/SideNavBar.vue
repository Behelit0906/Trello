<template>
  <nav>
    <Transition name="fade" mode="out-in">
      <div v-if="collapseSideBar" class="dark:text-textDark dark:bg-dark bg-sidenavbar border-r border-[#ffffff29] transition-all relative" >
        <button @click="switcher" class="relative w-4 h-screen">
          <span class="absolute flex items-center justify-center top-1 -right-3 w-[26px] h-[26px] dark:bg-dark bg-sidenavbar rounded-full border border-[#ffffff29]">
            <Icon icon="weui:arrow-filled" width="20" height="20" class="dark:text-textDark text-dynamicTextColor"/>
          </span>
        </button>
      </div>
      <div v-else class="w-[260px] h-full flex flex-col text-dynamicTextColor dark:text-textDark dark:bg-dark bg-sidenavbar border-r border-[#ffffff29] transition-all">
        <div class="flex items-center gap-2 px-3 py-2 mb-5 h-[57px] border-b-[0.5px] border-[#ffffff29]">
          <div class="flex justify-center dark:text-dark items-center w-8 h-8 rounded bg-gradient-to-r from-[#1F845A] to-[#4BCE97] shrink-0">
            T
          </div>
          <div class="flex flex-col justify-center w-full h-10 text-xs">
            <span class="font-medium text-sm">Trello Workspace</span>
            <span>Free</span>
          </div>
          <button @click="switcher" class="flex justify-center items-center w-8 h-8 shrink-0 hover:bg-[#ffffff33] rounded">
            <Icon icon="weui:arrow-filled" width="20" height="20" rotate="90" class="dark:text-textDark"/>
          </button>
        </div>
        <div class="flex items-center justify-between pl-3 mb-2 group">
        <div class="flex items-center justify-between w-full pr-2">
          <h2 class="text-sm font-medium">Your boards</h2>
          <div class="flex items-center gap-2">
            <button @click.stop="showSortModal = !showSortModal"  class="w-6 h-6 hidden group-hover:flex justify-center items-center hover:bg-[#ffffff33] rounded">
              <Icon id="sortButton" icon="tabler:dots" width="20" height="20" class="dark:text-textDark" />
            </button>
            <button id="addBoardButton" @click="showAddBoardModal = !showAddBoardModal" class="w-6 h-6 flex justify-center items-center hover:bg-[#ffffff33] rounded">
              <Icon icon="ic:round-plus" width="20" height="20" class="dark:text-textDark pointer-events-none" />
            </button>
          </div>
        </div> 
        </div>
        <div>
          <transition-group class="flex flex-col gap" name="list" tag="ul">
            <li 
              :class="dataStore.selectedBoard === board.id ? 'bg-[#ffffff42]' : 'hover:bg-[#ffffff33]'" 
              class="flex items-center justify-between h-8 px-3 text-sm hover:cursor-pointer group select-none"  
              v-for="board in dataStore.boards" :key="board.id"
              @click="dataStore.setSelectedBoard(board.id)"> 
              <div class="flex gap-2">
                <img class="w-6 h-5 rounded-[2px]" :src="`/src/assets/backgrounds/${board.background}.webp`" alt="bg-image">
                {{ board.title }} 
              </div> 
              <div class="flex items-center gap-2">
                <button @click.stop="(event:MouseEvent) => deleteModalSwitch(board.id, board.title, event)" class="w-6 h-6 hidden group-hover:flex justify-center items-center hover:bg-[#ffffff33] rounded">
                  <Icon class="deleteBoardButton" icon="tabler:dots" width="20" height="20" />
                </button>
                <button @click.stop="dataStore.setFavoritePropOfABoard(board.id)" class="w-4 h-4 justify-center items-center rounded group/favorite">
                  <svg :class="board.favorite ? 'block group-hover/favorite:hidden' : 'hidden'" width="16" height="16" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.9999 18.6266L7.49495 20.995C6.739 21.3924 5.80401 21.1018 5.40658 20.3459C5.24833 20.0448 5.19372 19.7 5.25121 19.3649L6.11158 14.3485L2.46699 10.7959C1.85542 10.1998 1.84291 9.22074 2.43904 8.60917C2.67643 8.36564 2.98747 8.20715 3.32403 8.15825L8.36072 7.42637L10.6132 2.86236C10.9912 2.0965 11.9184 1.78206 12.6843 2.16003C12.9892 2.31054 13.2361 2.55739 13.3866 2.86236L15.6391 7.42637L20.6758 8.15825C21.5209 8.28106 22.1065 9.06576 21.9837 9.91094C21.9348 10.2475 21.7763 10.5585 21.5328 10.7959L17.8882 14.3485L18.7486 19.3649C18.893 20.2066 18.3276 21.006 17.4859 21.1504C17.1507 21.2079 16.8059 21.1533 16.5049 20.995L11.9999 18.6266Z" fill="currentColor"></path></svg>
                  <svg :class="board.favorite ? 'hidden group-hover/favorite:block' : 'hidden group-hover:block'" class="hover:scale-[1.15]" width="16" height="16" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.49495 20.995L11.9999 18.6266L16.5049 20.995C16.8059 21.1533 17.1507 21.2079 17.4859 21.1504C18.3276 21.006 18.893 20.2066 18.7486 19.3649L17.8882 14.3485L21.5328 10.7959C21.7763 10.5585 21.9348 10.2475 21.9837 9.91094C22.1065 9.06576 21.5209 8.28106 20.6758 8.15825L15.6391 7.42637L13.3866 2.86236C13.2361 2.55739 12.9892 2.31054 12.6843 2.16003C11.9184 1.78206 10.9912 2.0965 10.6132 2.86236L8.36072 7.42637L3.32403 8.15825C2.98747 8.20715 2.67643 8.36564 2.43904 8.60917C1.84291 9.22074 1.85542 10.1998 2.46699 10.7959L6.11158 14.3485L5.25121 19.3649C5.19372 19.7 5.24833 20.0448 5.40658 20.3459C5.80401 21.1018 6.739 21.3924 7.49495 20.995ZM19.3457 10.0485L15.6728 13.6287L16.5398 18.684L11.9999 16.2972L7.45995 18.684L8.327 13.6287L4.65411 10.0485L9.72993 9.31093L11.9999 4.71146L14.2699 9.31093L19.3457 10.0485Z" fill="currentColor"></path></svg>
                </button>
              </div>
            </li>
          </transition-group>
        </div>
      </div>
    </Transition>

    <!-- Modales para organizar las boards y borrar boards -->
    <Teleport to="#modal">
      <Transition>
        <AsyncSortingModal v-if="showSortModal" @close="showSortModal = false" />
      </Transition>
    </Teleport>
    <Teleport to="#modal">
      <Transition>
        <div v-if="boardId && boardTitle">
          <AsyncDeleteBoardModal :title="boardTitle" :top="top" :left="left" @close="close" @delete="deleteBoard" />
        </div>
      </Transition>
    </Teleport>
    <Teleport to="#modal">
      <Transition>
        <AsyncCreateBoardModal @close="showAddBoardModal = false" v-if="showAddBoardModal" />
      </Transition>
    </Teleport>
  </nav>
</template>
<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useDataStore } from '../stores/useDataStore'
import AsyncCreateBoardModal from './AsyncCreateBoardModal'
import AsyncSortingModal from './AsyncSortingModal'
import AsyncDeleteBoardModal from './AsyncDeleteBoardModal'
import { ref } from 'vue'

const dataStore = useDataStore()
const collapseSideBar = ref(false)
const switcher = () => (collapseSideBar.value = !collapseSideBar.value)
const showSortModal = ref(false)
const showAddBoardModal = ref(false)
const top = ref(0)
const left = ref(0)
const boardId = ref("")
const boardTitle = ref("")

const deleteModalSwitch = (id:string, title:string, event: MouseEvent) => {
  if(boardId.value !== "" && boardTitle.value !== "") {
    close()
  }
  else {
    const target = event.target as HTMLElement
    const rect = target.getBoundingClientRect()
    top.value = rect.bottom + 10
    left.value = rect.left
    boardId.value = id
    boardTitle.value = title
  }

}

const close = () => {
  top.value = 0
  left.value = 0
  boardId.value = ""
  boardTitle.value = ""
}

const deleteBoard = () => {
  if(boardId.value !== "") {
    dataStore.deleteBoard(boardId.value)
    close()
  }
}

</script>
<style setup>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.1s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(-260px);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateX(0px);
}

.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.2s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}
</style>