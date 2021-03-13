<template>
	<BaseHero :theme-dark="isDark" />
	<div
		class="min-h-screen bg-my-gray-100 dark:bg-dark-blue-800 overflow-hidden"
	>
		<div class="relative max-w-2xl px-5 mx-auto">
			<TheHeader @set-theme="setTheme" />
			<TodoApp />
		</div>
	</div>
</template>

<script>
import BaseHero from './components/layout/BaseHero.vue';
import TheHeader from './components/layout/TheHeader.vue';
import TodoApp from './components/todos/TodoApp.vue';

export default {
	components: {
		BaseHero,
		TheHeader,
		TodoApp,
	},
	data() {
		return {
			isDark: document.documentElement.classList.contains('dark'),
		};
	},
	methods: {
		setTheme(currIsDark) {
			this.isDark = currIsDark;
		},
	},
};
</script>

<style>
</style>