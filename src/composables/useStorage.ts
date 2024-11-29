import { ref, watch } from 'vue'

export function useStorage<T>(key: string, initialValue: T) {
  // Leer el valor del localStorage
  const storedValue = localStorage.getItem(key)

  // Determinar si debemos usar JSON.parse o no
  const data = ref<T>(
    storedValue
      ? typeof initialValue === 'object'
        ? JSON.parse(storedValue)
        : (storedValue as unknown as T) // Si no es un objeto, simplemente lo usamos tal cual
      : initialValue
  )

  // Observar cambios en el dato reactivo
  watch(data, () => {
    const valueToStore =
      typeof data.value === 'object' ? JSON.stringify(data.value) : data.value
    localStorage.setItem(key, String(valueToStore))
  }, { deep: true })

  return data
}
