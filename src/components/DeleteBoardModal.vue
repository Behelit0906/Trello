<template>``
  <GenericModal @close="$emit('close')" :title="reactiveTitle" button-id="deleteBoardButton" :top="top" :left="left">
    <div class="py-2">
      <div @click="deleteSwitch" v-if="!deleteBoard" class="flex items-center justify-between py-2 px-3 hover:cursor-pointer hover:bg-[#DCDFE4] dark:hover:bg-[#ffffff33]">
        <span>Delete board</span>
        <Icon icon="weui:arrow-filled" width="20" height="20" class="dark:text-textDark"/>
      </div>
      <div class="flex flex-col gap-2 px-3" v-else>
        <button @click="deleteSwitch" class="absolute flex items-center justify-center w-8 h-8 left-2 top-3 hover:bg-[#DCDFE4] dark:hover:bg-[#ffffff33] rounded">
          <Icon icon="weui:arrow-filled" width="16" height="16" rotate="90" />
        </button>
        <p>
          This action cannot be undone.
        </p>
        <button @click="$emit('delete')" class="w-full py-[6px] bg-[#AE2E24] dark:text-black text-white rounded">
          Delete
        </button>

      </div>
    </div>
  </GenericModal>
</template>
<script setup lang="ts">
import GenericModal from './GenericModal.vue'
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps<{
  title: string
  top: number
  left: number
}>()
const emit = defineEmits(['close', 'delete'])

const reactiveTitle = ref(props.title)
const deleteBoard = ref(false)

const deleteSwitch = () => {
  deleteBoard.value = !deleteBoard.value
  if(reactiveTitle.value === props.title) reactiveTitle.value = "Delete board?"
  else reactiveTitle.value = props.title
}

</script>