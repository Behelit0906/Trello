<template>
  <article ref="element" :style="{top: `${top}px`, left: `${left}px`}" class="absolute w-[304px] bg-white dark:bg-dark rounded text-sm text-[#44546F] dark:text-[#9FADBC] text-sans">
    <header class="relative mb-5">
      <h2 class="text-center pt-5 font-medium">{{ title }}</h2>
      <button @click="emit('close')" class="absolute flex items-center justify-center w-8 h-8 right-2 top-3 hover:bg-[#DCDFE4] dark:hover:bg-[#ffffff33] rounded">
        <Icon icon="material-symbols:close" width="16" height="16" />
      </button>
    </header>
    <section>
      <slot></slot>
    </section>
  </article>
</template>
<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'

const props = defineProps<{
  title: string
  buttonId: string
  top: number
  left: number
}>()

const element = ref(null)
const emit = defineEmits(['close'])

const onClickOutsideHandler = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if(target.id === props.buttonId || target.classList.contains(props.buttonId)) return;
  emit('close')
}

onClickOutside(element, onClickOutsideHandler)

</script>