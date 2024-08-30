<template>
	<div class="grid grid-cols-3">
		<div class="col-span-2">
			App form
			<v-form :fields="fieldsRender" v-model:value="model" :initialValues="initialValues"></v-form>
		</div>
		<div class="col-span-1">
			<pre>{{ fieldsRender }}</pre>
		</div>
	</div>
</template>

<script lang="ts" setup>
import {readFieldsByCollection} from "@directus/sdk";
import { APIServer } from "@directusLayer/composables/api-server"
const client = APIServer.getInstance();
const fields = await client.request(
	readFieldsByCollection('news')
)

const model = ref({})
const initialValues = ref({

})

const fieldsRender = computed(() => {
	return fields.map((field) => {
		return {
			...field,
			value: ''
		}
	})
})
</script>
