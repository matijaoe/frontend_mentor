<template>
	<div
		class="absolute top-0 left-0 w-full h-small-img md:h-large-img bg-gradient-to-r from-my-purple to-my-cyan bg-cover"
		:class="backgroundImage"
	></div>
</template>

<script>
export default {
	props: ['themeDark'],
	data() {
		return {
			windowWidth: window.innerWidth,
		};
	},
	mounted() {
		window.onresize = () => (this.windowWidth = window.innerWidth);
	},
	computed: {
		isSmallWidth() {
			return this.windowWidth <= 640;
		},
		backgroundImage() {
			return {
				'bg-desktop-light': !this.themeDark && !this.isSmallWidth,
				'bg-desktop-dark': this.themeDark && !this.isSmallWidth,
				'bg-mobile-light': !this.themeDark && this.isSmallWidth,
				'bg-mobile-dark': this.themeDark && this.isSmallWidth,
			};
		},
	},
};
</script>

<style scoped>
.bg-desktop-light {
	background-image: url('../../assets/img/bg-desktop-light.jpg');
}
.bg-desktop-dark {
	background-image: url('../../assets/img/bg-desktop-dark.jpg');
}
.bg-mobile-light {
	background-image: url('../../assets/img/bg-mobile-light.jpg');
}
.bg-mobile-dark {
	background-image: url('../../assets/img/bg-mobile-dark.jpg');
}
</style>

