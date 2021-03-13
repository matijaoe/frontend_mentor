<template>
	<li
		class="flex cursor-pointer select-none text-my-gray-500 dark:text-dark-grayish-blue-100"
		@mouseover="todoIsHovered = true"
		@mouseleave="todoIsHovered = false"
	>
		<label
			class="py-4 pl-6 pr-5 md:py-5 md:pl-7 md:pr-6 cursor-pointer group"
			@click="toggleCheckbox"
		>
			<div
				:class="checkboxBorderStyles"
				class="flex items-center p-0.5 rounded-full"
			>
				<div
					:class="checkboxStyles"
					class="relative flex-shrink-0 inline-block w-5 h-5 md:w-6 md:h-6 overflow-hidden rounded-full checkbox transition duration-300 ease-in-out"
				>
					<CheckmarkIcon v-if="checked && !isNewTodo" />
				</div>
			</div>
		</label>
		<div class="flex flex-grow" :class="itemCheckedStyles">
			<span
				v-if="!isNewTodo"
				class="flex items-center flex-grow py-2 pr-6"
				@click="toggleCheckbox"
			>
				{{ content }}
			</span>
			<slot v-else></slot>
		</div>
		<span
			v-show="!isNewTodo && todoIsHovered && !isSmallWidth"
			class="flex items-center flex-shrink-0 px-5 ml-auto group"
			@click="$emit('delete-todo', id)"
		>
			<CloseIcon />
		</span>
	</li>
</template>

<script>
import CloseIcon from '../UI/Icons/CloseIcon.vue';
import CheckmarkIcon from '../UI/Icons/CheckmarkIcon.vue';

export default {
	components: { CloseIcon, CheckmarkIcon },
	props: {
		isNewTodo: { type: Boolean, default: false },
		done: { type: Boolean, required: false },
		content: { type: String, required: false },
		id: { type: String, required: false },
	},
	emits: ['toggle-todo', 'delete-todo'],
	data() {
		return {
			checked: this.done,
			todoIsHovered: false,
		};
	},
	methods: {
		toggleCheckbox() {
			if (!this.isNewTodo) {
				this.checked = !this.checked;
				this.$emit('toggle-todo', this.id);
			}
		},
	},
	computed: {
		itemCheckedStyles() {
			if (this.checked) {
				return [
					'line-through',
					'text-my-gray-300',
					'dark:text-dark-grayish-blue-400',
				];
			}
			return {};
		},
		checkboxBorderStyles() {
			if (this.isNewTodo) {
				return ['bg-gradient-to-br', ' from-my-cyan', ' to-my-purple'];
			} else if (this.checked && !this.isNewTodo) {
				return ['bg-gradient-to-br', ' from-my-cyan', ' to-my-purple'];
			}
			return ['bg-my-gray-200', ' dark:bg-dark-grayish-blue-500'];
		},
		checkboxStyles() {
			if (this.checked && !this.isNewTodo) {
				return ['bg-transparent'];
			}
			return ['bg-white', 'dark:bg-dark-blue-700'];
		},
	},
	watch: {
		windowWidth(width) {
			console.log(width);
			console.log('isSmallWidth: ' + this.isSmallWidth);
		},
	},
};
</script>

<style scoped>
label:hover > div {
	background: linear-gradient(
		to bottom right,
		hsl(192, 100%, 67%),
		hsl(280, 87%, 65%)
	);
}
</style>
