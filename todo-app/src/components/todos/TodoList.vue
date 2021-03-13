<template>
	<base-card
		class="p-0 mb-5 divide-y-2 divide-my-gray-200 dark:divide-dark-grayish-blue-500"
	>
		<p
			v-if="filteredTodos.length === 0"
			class="p-5 text-2xl font-bold text-center text-my-gray-500 dark:text-dark-grayish-blue-200"
		>
			Nothing here 🍂
		</p>
		<transition-group
			name="list"
			tag="ul"
			mode="out-in"
			v-else
			class="list-none divide-y-2 divide-my-gray-200 dark:divide-dark-grayish-blue-500 flex flex-col relative"
		>
			<TodoItem
				v-for="todo in filteredTodos"
				:key="todo.id"
				:id="todo.id"
				:content="todo.content"
				:done="todo.done"
				@toggle-todo="$emit('toggle-todo', $event)"
				@delete-todo="$emit('delete-todo', $event)"
			/>
		</transition-group>

		<TodoControls
			:count="count"
			@clear-completed="$emit('clear-completed')"
		>
			<template #filters>
				<TodoFilter
					@set-filter="setFilter"
					class="hidden sm:block"
				/> </template
		></TodoControls>
	</base-card>

	<base-card class="flex justify-around p-4 sm:p-5 sm:hidden">
		<TodoFilter @set-filter="setFilter" />
	</base-card>
</template>

<script>
import TodoItem from './TodoItem.vue';
import TodoControls from './TodoControls.vue';
import TodoFilter from './TodoFilter.vue';

export default {
	props: ['todos', 'count'],
	emits: ['toggle-todo', 'delete-todo', 'clear-completed'],
	components: {
		TodoItem,
		TodoControls,
		TodoFilter,
	},
	data() {
		return {
			currentFilter: 'all',
		};
	},
	methods: {
		setFilter(selectedFilter) {
			this.currentFilter = selectedFilter;
		},
	},
	computed: {
		filteredTodos() {
			const filter = this.currentFilter;
			if (filter === 'active') {
				return this.todos.filter((todo) => !todo.done);
			} else if (filter === 'completed') {
				return this.todos.filter((todo) => todo.done);
			} else {
				return this.todos;
			}
		},
	},
};
</script>

<style scoped>
.list-enter-from {
	opacity: 0;
	transform: translateX(-20px);
}

.list-leave-to {
	opacity: 0;
}

.list-enter-active {
	transition: all 500ms ease-out 200ms;
}

.list-leave-active {
	transition: all 500ms ease-in;
	position: absolute;
	width: 100%;
}

.list-move {
	transition: transform 500ms ease-in-out;
}
</style>