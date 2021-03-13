<template>
	<article
		class="bg-white dark:bg-dark-blue-700 shadow-lg rounded-md overflow-hidden"
	>
		<slot></slot>
	</article>
</template>

<style scoped>
article {
	box-shadow: 0 8px 16px 5px rgba(0, 0, 0, 0.03);
}
</style>