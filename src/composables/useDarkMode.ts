import { ref} from 'vue';

export function useDarkMode() {
  const isDarkMode = ref(localStorage.getItem('theme') ?  String(localStorage.getItem('theme')) : 'light')

  const toggleDarkMode = (theme: string) => {
    const html = document.documentElement;
    if (theme === 'dark') {
      html.classList.add('dark')
      isDarkMode.value = 'dark'
      localStorage.setItem('theme', 'dark')
    } 
    else if (theme === 'system') {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (systemPrefersDark) {
        html.classList.add('dark')
      } else {
        html.classList.remove('dark')
      }
      isDarkMode.value = 'system'
      localStorage.setItem('theme', 'system')
    } 
    else {
      html.classList.remove('dark');
      isDarkMode.value = 'light'
      localStorage.setItem('theme', 'light')
    }
  };
  

  return { isDarkMode, toggleDarkMode }
  
}
