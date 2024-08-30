<template>
	<nav class="pagination" v-if="pages.length > 1">
		<button
			:disabled="currentPage === 1"
			@click="changePage(currentPage - 1)"
			class="btn-pagination"
		>
			Trang trước
		</button>

		<button
			v-for="page in visiblePages"
			:key="page"
			:class="{ active: page === currentPage }"
			@click="changePage(page)"
			class="btn-pagination"
		>
			{{ page }}
		</button>

		<button
			:disabled="currentPage === totalPages"
			@click="changePage(currentPage + 1)"
			class="btn-pagination"
		>
			Trang sau
		</button>
	</nav>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue';
import {readItems} from "@directus/sdk";
import {useApi} from "~/composables/api";

const props = defineProps({
	collection: {
		type: String,
		required: true,
	},
	query: {
		type: Object,
		default: () => ({}),
	},
	currentPage: {
		type: Number,
		required: true,
	},
	limit: {
		type: Number,
		required: true,
	},
	numberOfPagesToShow: {
		type: Number,
		default: 5, // Số trang hiển thị xung quanh trang hiện tại
	}
});

const totalPages = ref(0)

const api = useApi()
const fetchTotalPages = async () => {
	const data = await api.request(
		readItems("pagination", {
			fields: ['id'],
			filter: props.query,
			collection: props.collection
		})
	).catch((error) => {
		return 0
	});


	totalPages.value = Math.ceil(data / props.limit);
};

await fetchTotalPages();

const emit = defineEmits(['changepage']);

const changePage = (page) => {
	if (page >= 1 && page <= totalPages.value) {
		emit('changepage', page);
	}
};

const pages = computed(() => {
	const pagesArray = [];
	for (let i = 1; i <= totalPages.value; i++) {
		pagesArray.push(i);
	}
	return pagesArray;
});

const visiblePages = computed(() => {
	const start = Math.max(1, props.currentPage - Math.floor(props.numberOfPagesToShow / 2));
	const end = Math.min(totalPages.value, start + props.numberOfPagesToShow - 1);

	const visible = [];
	for (let i = start; i <= end; i++) {
		visible.push(i);
	}

	return visible;
});

/*
<the-pagination
	@changepage="changePage"
	:limit="limit"
	:current-page="page"
	collection="posts"
	:filter="{}">
</the-pagination>
 */
</script>

<style scoped>
.pagination {
	display: flex;
	list-style: none;
	padding: 0;
	@apply gap-3;
}

.btn-pagination {
	@apply px-4 py-2 bg-gray-200 text-gray-800 rounded-md border-none cursor-pointer;
	&.active {
		@apply bg-red-700 text-white;
	}
}
</style>
