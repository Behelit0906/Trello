<template>
  <div id="themeModal" class="absolute z-10 flex justify-center top-[200px] right-[312px] w-[232px] py-2 rounded-lg bg-white dark:bg-dark">
    <fieldset>
      <!-- Botón Light -->
      <button 
        :class="theme === 'light' ? 'text-[#0C66E4] bg-[#E9F2FF] left-shadow' : 'hover:bg-[#0000001a] left-shadow-hover'" 
        class="relative w-[229px] h-[68px] flex items-center px-3 py-2 gap-2 dark:text-textDark">
        <input type="radio" name="theme" id="light" value="light" v-model="theme">
        <label class="flex items-center gap-2" for="light">
          <img class="shadow rounded-lg" src="../assets/light_mode.svg" alt="light-mode-icon">
          Light
        </label>
        <span @click="clickHandler('light')" class="absolute block w-full h-full left-0 z-10"></span>
      </button>

      <!-- Botón Dark -->
      <button
      :class="theme === 'dark' ? 'text-[#0C66E4] bg-[#E9F2FF] dark:bg-[#1C2B41] dark:text-[#579dff] left-shadow' : 'hover:bg-[#0000001a] left-shadow-hover dark:text-textDark'"  
        class="relative w-[229px] h-[68px] flex items-center px-3 py-2 gap-2">
        <input type="radio" name="theme" id="dark" value="dark" v-model="theme">
        <label class="flex items-center gap-2" for="dark">
          <img class="shadow rounded-lg" src="../assets/dark_mode.svg" alt="dark-mode-icon">
          Dark
        </label>
        <span @click="clickHandler('dark')" class="absolute block w-full h-full left-0 z-10"></span>
      </button>

      <!-- Botón Match browser -->
      <button
        :class="theme === 'system' ? 'text-[#0C66E4] bg-[#E9F2FF] dark:bg-[#1C2B41] dark:text-[#579dff] left-shadow' : 'hover:bg-[#0000001a] left-shadow-hover dark:text-textDark'"  
        class="relative w-[229px] h-[68px] flex items-center px-3 py-2 gap-2">
        <input type="radio" name="theme" id="system" value="system" v-model="theme">
        <label class="flex items-center gap-2" for="system">
          <img class="shadow rounded-lg" src="../assets/system_mode.svg" alt="system-mode-icon">
          Match browser
        </label>
        <span @click="clickHandler('system')" class="absolute block w-full h-full left-0 z-10"></span>
      </button>
    </fieldset>
  </div>
</template>
<script setup lang="ts">
import { useDarkMode } from '../composables/useDarkMode'
import { ref, watch } from 'vue'

const darkMode = useDarkMode()
const theme = ref(darkMode.isDarkMode)


const clickHandler = (t: string) => {
  theme.value = t
}

watch(theme, () => {
  darkMode.toggleDarkMode(theme.value)
})


</script>
<style scoped>
.left-shadow-hover:hover {
  box-shadow:  -3px 0px #0C66E4;
}

.left-shadow {
  box-shadow:  -3px 0px #0C66E4;
}

</style>