<template>
	<header
		class="flex justify-between pt-8 pb-8 md:pt-16 md:pb-14 text-3xl md:text-4xl text-my-gray-100"
	>
		<span class="font-bold tracking-most-widest">TODO</span>
		<button class="btn" @click="toggleTheme">
			<transition mode="out-in">
				<SunIcon v-if="isDark" />
				<MoonIcon v-else />
			</transition>
		</button>
	</header>
</template>

<script>
import MoonIcon from '../UI/Icons/MoonIcon.vue';
import SunIcon from '../UI/Icons/SunIcon.vue';
export default {
	components: {
		MoonIcon,
		SunIcon,
	},
	data() {
		return {
			isDark: document.documentElement.classList.contains('dark'),
		};
	},
	methods: {
		toggleTheme() {
			this.isDark = !this.isDark;
			this.$emit('set-theme', this.isDark);
		},
	},
	watch: {
		isDark(value) {
			if (value) {
				document.documentElement.classList.add('dark');
				this.isDark = true;
			} else {
				document.documentElement.classList.remove('dark');
				this.isDark = false;
			}
		},
	},
	mounted() {
		this.$emit('set-theme', this.isDark);
	},
};
</script>

<style scoped>
.v-enter-from {
	opacity: 0;
	transform: translateY(-20px);
}

.v-leave-to {
	opacity: 0;
	transform: translateY(20px);
}

.v-enter-active {
	transition: all 300ms ease-out;
}

.v-leave-active {
	transition: all 300ms ease-in;
}
</style>