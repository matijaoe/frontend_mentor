<template>
	<div class="space-x-5 text-base text-my-gray-400">
		<button
			class="filter-btn"
			:class="{ 'text-bright-blue': selectedFilter === 'all' }"
			@click="setFilter('all')"
		>
			All
		</button>
		<button
			class="filter-btn"
			:class="{ 'text-bright-blue': selectedFilter === 'active' }"
			@click="setFilter('active')"
		>
			Active
		</button>
		<button
			class="filter-btn"
			:class="{ 'text-bright-blue': selectedFilter === 'completed' }"
			@click="setFilter('completed')"
		>
			Completed
		</button>
	</div>
</template>

<script>
export default {
	emits: ['set-filter'],
	data() {
		return {
			selectedFilter: 'all',
		};
	},
	methods: {
		setSelectedFilter(filterName) {
			this.selectedFilter = filterName;
		},
		setFilter(filterName) {
			this.setSelectedFilter(filterName);
			this.$emit('set-filter', filterName);
		},
	},
};
</script>