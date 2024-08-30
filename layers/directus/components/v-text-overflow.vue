<script setup lang="ts">
import { ref, watch } from 'vue';

interface Props {
	/** The text that should be displayed */
	text?: string | number | boolean | Record<string, any> | Array<any>;
	/** What parts of the text should be highlighted */
	highlight?: string;
	/** The placement of the tooltip */
	placement?: 'top' | 'bottom' | 'left' | 'right' | 'start' | 'end';
}

withDefaults(defineProps<Props>(), {
	text: undefined,
	highlight: undefined,
	placement: 'top',
});

const el = ref<HTMLElement>();
const hasEllipsis = ref(false);


</script>

<template>
	<div ref="el" class="v-text-overflow">
		{{ text }}
	</div>
</template>

<style scoped>
.v-text-overflow {
	overflow: hidden;
	line-height: normal;
	white-space: nowrap;
	text-overflow: ellipsis;
}
</style>
