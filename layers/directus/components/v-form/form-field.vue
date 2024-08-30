<script setup lang="ts">
import { formatFieldFunction } from '@directusLayer/components/utils/format-field-function';

import { isEqual } from 'lodash';
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import FormFieldInterface from './form-field-interface.vue';
import FormFieldLabel from "./form-field-label.vue";
import type { FormField } from './types';

const props = withDefaults(
	defineProps<{
		field: FormField;
		disabled?: boolean;
		modelValue?: any;
		initialValue?: any;
		primaryKey?: string | number;
		loading?: boolean;
		validationError?: any;
		autofocus?: boolean;
		badge?: string;
		disabledMenuOptions?: MenuOptions[];
		direction?: string;
	}>(),
	{
		modelValue: undefined,
		initialValue: undefined,
		primaryKey: undefined,
		validationError: undefined,
		badge: undefined,
		direction: undefined,
	},
);

const emit = defineEmits(['toggle-batch', 'toggle-raw', 'unset', 'update:modelValue', 'setFieldValue']);

const { t } = useI18n();

const isDisabled = computed(() => {
	if (props.disabled) return true;
	if (props.field?.meta?.readonly === true) return true;
	if (props.batchMode && props.batchActive === false) return true;
	return false;
});

const { internalValue, isEdited, defaultValue } = useComputedValues();


const validationMessage = computed(() => {
	if (!props.validationError) return null;

	if (props.validationError.code === 'RECORD_NOT_UNIQUE') {
		return t('validationError.unique');
	} else {
		return t(`validationError.${props.validationError.type}`, props.validationError);
	}
});

const validationPrefix = computed(() => {
	if (!props.validationError) return null;

	if (props.validationError.field.includes('(') && props.validationError.field.includes(')')) {
		return formatFieldFunction(props.field.collection!, props.validationError.field) + ': ';
	}

	return null;
});

function emitValue(value: any) {
	if (
		(isEqual(value, props.initialValue) || (props.initialValue === undefined && isEqual(value, defaultValue.value)))
	) {
		emit('unset', props.field);
	} else {
		emit('update:modelValue', value);
	}
}


function useComputedValues() {
	const defaultValue = computed<any>(() => props.field?.schema?.default_value);
	const internalValue = ref<any>(getInternalValue());

	const isEdited = computed(
		() => props.modelValue !== undefined && isEqual(props.modelValue, props.initialValue) === false,
	);

	watch(
		() => props.modelValue,
		() => {
			const newVal = getInternalValue();

			if (!isEqual(internalValue.value, newVal)) {
				internalValue.value = newVal;
			}
		},
	);

	return { internalValue, isEdited, defaultValue };

	function getInternalValue(): any {
		if (props.modelValue !== undefined) return props.modelValue;
		if (props.initialValue !== undefined) return props.initialValue;
		return defaultValue.value;
	}
}
</script>

<template>
	<div class="field" :class="[field.meta?.width || 'full', { invalid: validationError }]">

		<template>
			<form-field-label
				:field="field"
				:edited="isEdited"
				:has-error="!!validationError"
				:badge="badge"
				:loading="loading"
				@toggle-batch="$emit('toggle-batch', $event)"
				@toggle-raw="$emit('toggle-raw', $event)"
				:toggle="true"
			/>
		</template>

		<form-field-interface
			:autofocus="autofocus"
			:model-value="internalValue"
			:field="field"
			:loading="loading"
			:disabled="isDisabled"
			:primary-key="primaryKey"
			:direction="direction"
			@update:model-value="emitValue($event)"
			@set-field-value="$emit('setFieldValue', $event)"
		/>

		<small v-if="field.meta && field.meta.note" class="type-note" />

		<small v-if="validationError" class="validation-error selectable">
			<template v-if="field.meta?.validation_message">
				{{ field.meta?.validation_message }}
				<v-icon small right name="help" />
			</template>
			<template v-else>{{ validationPrefix }}{{ validationMessage }}</template>
		</small>
	</div>
</template>

<style scoped>
.field {
	position: relative;
}

.type-note {
	position: relative;
	display: block;
	max-width: 520px;
	margin-top: 4px;

	:deep(a) {
		color: var(--theme--primary);

		&:hover {
			color: var(--theme--primary-accent);
		}
	}
}

.invalid {
	margin: -12px;
	padding: 12px;
	background-color: var(--danger-alt);
	border-radius: var(--theme--border-radius);
	transition: var(--medium) var(--transition);
	transition-property: background-color, padding, margin;
}

.validation-error {
	display: flex;
	align-items: center;
	margin-top: 4px;
	color: var(--theme--danger);
	font-style: italic;
}

.label-spacer {
	height: 28px;
}
</style>
