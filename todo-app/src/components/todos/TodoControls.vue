<template>
	<div
		class="flex items-center justify-between text-sm text-my-gray-400 dark:text-dark-grayish-blue-300 px-6 py-4"
	>
		<p class="flex-1">{{ itemsLeft }}</p>
		<slot name="filters"></slot>
		<button
			@click="$emit('clear-completed')"
			class="hover:text-my-gray-500 dark:hover:text-dark-grayish-blue-200 focus:outline-none flex-1 text-right transition duration-300 ease-in-out"
		>
			Clear completed
		</button>
	</div>
</template>

<script>
export default {
	props: ['count'],
	emits: ['clear-completed'],
	computed: {
		itemsLeft() {
			if (this.count === 0) {
				return 'No items left';
			} else if (this.count === 1) {
				return `${this.count} item left`;
			} else {
				return `${this.count} items left`;
			}
		},
	},
};
</script>