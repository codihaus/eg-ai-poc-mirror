<template>
	<div class="grid grid-cols-12 gap-4 h-screen main">
		<div class="bg-white col-span-3 rounded p-4">
			<slot name="left"></slot>
		</div>

		<div class="col-span-6 bg-white rounded p-4">
			<slot name="default"></slot>
		</div>

		<div class="bg-white col-span-3 rounded p-4">
			<slot name="right"></slot>
		</div>
	</div>
</template>

<script lang="ts" setup>

</script>
<style scoped>
.main {
	@apply bg-gray-100 p-2;

	> * {
		@apply h-full overflow-y-auto;
	}
}
</style>
