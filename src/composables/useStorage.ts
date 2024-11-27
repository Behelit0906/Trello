import { ref, watch } from 'vue'

export function useStorage<T>(key:string, initialValue:T) {

  const storedValue = localStorage.getItem(key)

  const data = ref<T>(storedValue ? JSON.parse(storedValue) : initialValue) 

  watch(data, () => {
    localStorage.setItem(key, JSON.stringify(data.value))
  }, { deep: true })

  return data
}