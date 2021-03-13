<template>
	<base-card class="mb-5 md:mb-6">
		<TodoItem isNewTodo>
			<input
				type="text"
				placeholder="Create a new todo..."
				class="focus:outline-none flex-1 bg-transparent placeholder-my-gray-400 dark:placeholder-dark-grayish-blue-300 pr-8"
				v-model.trim="currentTodo"
				@keydown.enter="addTodo"
			/>
		</TodoItem>
	</base-card>
</template>

<script>
import { nanoid } from 'nanoid';
import TodoItem from './TodoItem.vue';

export default {
	components: {
		TodoItem,
	},
	emits: ['add-todo'],
	inject: ['addNewTodo'],
	data() {
		return {
			currentTodo: '',
		};
	},
	methods: {
		addTodo() {
			const newTodo = {
				id: nanoid(8),
				content: this.currentTodo,
				done: false,
			};
			this.addNewTodo(newTodo);
			this.currentTodo = '';
		},
	},
};
</script>