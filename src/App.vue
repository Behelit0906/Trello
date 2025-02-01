<template>
	<div :class="`${background}`" class="w-full h-screen bg-cover overflow-hidden">
		<Navbar />
		<div class="w-full h-screen flex">
			<SideNavBar />
			<div class="px-5 w-full">
				
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { computed, onMounted } from 'vue';
import Navbar from './components/Navbar.vue';
import SideNavBar from './components/SideNavBar.vue';
import { useDataStore } from './stores/useDataStore';
import { useDynamicColor } from './composables/useDynamicColor';

const { setColorVariables } = useDynamicColor();
const dataStore = useDataStore();
const background = computed (()=> {
	let result = 'bg-1'
	const boards = dataStore.boards;
	const selectedBoard = dataStore.selectedBoard;

	for (let i = 0; i < boards.length; i++) {
		if (boards[i].id === selectedBoard) {
			result = boards[i].background
			break
		}
	}

	setColorVariables(`${result}.webp`)
	return result;
});

onMounted(() => {
	const theme = localStorage.getItem('theme');
	if(theme) {
		document.documentElement.classList.add(theme)
	}
})

</script>

