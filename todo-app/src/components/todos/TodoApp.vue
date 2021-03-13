<template>
	<section class="text-sm sm:text-base md:text-lg">
		<NewTodo />

		<base-card v-if="isEmpty" class="pl-5 pr-5 pt-8 pb-8 text-center">
			<p
				class="font-bold text-3xl text-my-gray-500 dark:text-dark-grayish-blue-200"
			>
				Add some todos! 🥳
			</p>
		</base-card>

		<TodoList
			v-else
			:todos="todos"
			:count="todosLeftCount"
			@toggle-todo="toggleTodoState"
			@delete-todo="deleteTodo"
			@clear-completed="clearCompletedTodos"
		/>
	</section>
</template>

<script>
import { nanoid } from 'nanoid';
import NewTodo from './NewTodo.vue';
import TodoList from './TodoList.vue';

export default {
	components: {
		NewTodo,
		TodoList,
	},
	provide() {
		return {
			addNewTodo: this.addNewTodo,
		};
	},
	data() {
		return {
			todos: [
				{
					id: nanoid(8),
					content: 'Learn Vue',
					done: true,
				},
				{
					id: nanoid(8),
					content: 'Get a girlfriend',
					done: false,
				},
				{
					id: nanoid(8),
					content: 'Graduate',
					done: false,
				},
				{
					id: nanoid(8),
					content: 'Get a job',
					done: false,
				},
				{
					id: nanoid(8),
					content: 'Get a car',
					done: false,
				},
				{
					id: nanoid(8),
					content: 'Get a better girlfriend',
					done: false,
				},
			],
			counter: 0,
		};
	},
	methods: {
		toggleTodoState(todoId) {
			const toggledTodo = this.todos.find((todo) => todo.id === todoId);
			toggledTodo.done = !toggledTodo.done;
		},
		addNewTodo(newTodo) {
			this.todos.unshift(newTodo);
		},
		deleteTodo(todoId) {
			this.todos = this.todos.filter((todo) => todo.id != todoId);
		},
		clearCompletedTodos() {
			this.todos = this.uncompletedTodos;
		},
	},
	computed: {
		todosCount() {
			return this.todos.length;
		},
		todosLeftCount() {
			return this.uncompletedTodos.length;
		},
		uncompletedTodos() {
			return this.todos.filter((todo) => !todo.done);
		},
		isEmpty() {
			return this.todos.length === 0;
		},
	},
};
</script>