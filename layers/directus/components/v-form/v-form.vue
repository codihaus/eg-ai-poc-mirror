<script setup lang="ts">
import {extractFieldFromFunction} from '@directusLayer/components/utils/extract-field-from-function';
import {assign, cloneDeep, isEqual, isNil, omit} from 'lodash';
import {computed, onBeforeUpdate, provide, ref, watch} from 'vue';
import FormField from './form-field.vue';
import type {Field, FormField as TFormField} from './types';
import ValidationErrors from './validation-errors.vue';
import {useForm} from "@directusLayer/composables/useForm";


type FieldValues = {
	[field: string]: any;
};

const props = withDefaults(
	defineProps<{
		collection?: string;
		fields?: Field[];
		initialValues?: FieldValues | null;
		modelValue?: FieldValues | null;
		loading?: boolean;
		batchMode?: boolean;
		primaryKey?: string | number;
		disabled?: boolean;
		validationErrors?: any[];
		autofocus?: boolean;
		group?: string | null;
		badge?: string;
		showValidationErrors?: boolean;
		showNoVisibleFields?: boolean;
		/* Enable the raw editor toggler on fields */
		rawEditorEnabled?: boolean;
		disabledMenuOptions?: any[];
		direction?: string;
		showDivider?: boolean;
		inline?: boolean;
	}>(),
	{
		collection: undefined,
		fields: undefined,
		initialValues: null,
		modelValue: null,
		primaryKey: undefined,
		validationErrors: () => [],
		group: null,
		badge: undefined,
		showValidationErrors: true,
		showNoVisibleFields: true,
		direction: undefined,
	},
);

const emit = defineEmits(['update:modelValue']);
const el = ref<Element>();

const values = computed(() => {
	return Object.assign({}, cloneDeep(props.initialValues), cloneDeep(props.modelValue));
});

const gridClass = computed<string | null>(() => {
	return 'grid with-fill';
});

const formFieldEls = ref<Record<string, any>>({});
onBeforeUpdate(() => {
	formFieldEls.value = {};
});

const {fieldNames, fieldsMap, getFieldsForGroup, fieldsForGroup, isDisabled} = useForm(props, values);

watch(
	() => props.validationErrors,
	(newVal, oldVal) => {
		if (!props.showValidationErrors) return;
		if (isEqual(newVal, oldVal)) return;
		if (newVal?.length > 0) el?.value?.scrollIntoView({behavior: 'smooth'});
	},
);

provide('values', values);

function setValue(fieldKey: string, value: any, opts?: { force?: boolean }) {
	const field = fieldsMap.value[fieldKey];

	if (opts?.force !== true && (!field || isDisabled(field))) return;

	const edits = props.modelValue ? cloneDeep(props.modelValue) : {};
	edits[fieldKey] = value;
	emit('update:modelValue', edits);
}

function apply(updates: { [field: string]: any }) {
	const updatableKeys = Object.keys(updates).filter((key) => {
		const field = fieldsMap.value[key];
		if (!field) return false;
		return field.schema?.is_primary_key || !isDisabled(field);
	})

	if (!isNil(props.group)) {
		const groupFields = getFieldsForGroup(props.group)
			.filter((field) => !field.schema?.is_primary_key && !isDisabled(field))
			.map((field) => field.field);

		emit('update:modelValue', assign({}, omit(props.modelValue, groupFields), pickKeepMeta(updates, updatableKeys)));
	} else {
		emit('update:modelValue', pickKeepMeta(assign({}, props.modelValue, updates), updatableKeys));
	}
}

function pickKeepMeta(obj: Record<string, any>, keys: string[]) {
	return Object.entries(obj).reduce<Record<string, any>>((result, [key, value]) => {
		if (keys.includes(key) || key.startsWith('$')) result[key] = value;
		return result;
	}, {});
}

function unsetValue(field: TFormField | undefined) {
	if (!field) return;
	if (!props.batchMode && isDisabled(field)) return;

	if (field.field in (props.modelValue || {})) {
		const newEdits = {...props.modelValue};
		delete newEdits[field.field];
		emit('update:modelValue', newEdits);
	}
}

function scrollToField(fieldKey: string) {
	const {field} = extractFieldFromFunction(fieldKey);
	if (!formFieldEls.value[field]) return;
	formFieldEls.value[field].$el.scrollIntoView({behavior: 'smooth'});
}

</script>

<template>
	<div ref="el" :class="['v-form', gridClass, { inline }]">
		<validation-errors
			v-if="showValidationErrors && validationErrors.length > 0"
			:validation-errors="validationErrors"
			:fields="fields ? fields : []"
			@scroll-to-field="scrollToField"
		/>

		<template v-for="(fieldName, index) in fieldNames" :key="fieldName">
			<template v-if="fieldsMap[fieldName]">
				<component
					:is="`interface-${fieldsMap[fieldName]!.meta?.interface || 'group-standard'}`"
					v-if="fieldsMap[fieldName]!.meta?.special?.includes('group')"
					v-show="!fieldsMap[fieldName]!.meta?.hidden"
					:ref="
						(el: Element) => {
							formFieldEls[fieldName] = el;
						}
					"
					:field="fieldsMap[fieldName]"
					:fields="fieldsForGroup[index] || []"
					:values="modelValue || {}"
					:initial-values="initialValues || {}"
					:disabled="disabled"
					:primary-key="primaryKey"
					:loading="loading"
					:validation-errors="validationErrors"
					:badge="badge"
					:direction="direction"
					v-bind="fieldsMap[fieldName]!.meta?.options || {}"
					@apply="apply"
				/>

				<form-field
					v-else-if="!fieldsMap[fieldName]!.meta?.hidden"
					:ref="
						(el) => {
							formFieldEls[fieldName] = el;
						}
					"
					:field="fieldsMap[fieldName]!"
					:model-value="(values || {})[fieldName]"
					:initial-value="(initialValues || {})[fieldName]"
					:disabled="isDisabled(fieldsMap[fieldName]!)"
					:primary-key="primaryKey"
					:loading="loading"
					:validation-error="
						validationErrors.find(
							(err) =>
								err.collection === fieldsMap[fieldName]!.collection &&
								(err.field === fieldName || err.field.endsWith(`(${fieldName})`)),
						)
					"
					:badge="badge"
					:direction="direction"
					@update:model-value="setValue(fieldName, $event)"
					@set-field-value="setValue($event.field, $event.value, { force: true })"
					@unset="unsetValue(fieldsMap[fieldName]!)"
				/>
			</template>
		</template>
	</div>
</template>

<style scoped>

.v-form {

	.first-visible-field :deep(.v-divider) {
		margin-top: 0;
	}

	&.inline > .no-fields-info {
		grid-column: 1 / -1;
	}
}

.v-divider {
	margin-bottom: 50px;
	grid-column-start: 1;
	grid-column-end: 3;
}
</style>
