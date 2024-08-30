<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { FormField } from './types';

const props = withDefaults(
	defineProps<{
		field: FormField;
		disabled?: boolean;
		active?: boolean;
		edited?: boolean;
		hasError?: boolean;
		badge?: string | null;
		loading?: boolean;
	}>(),
	{
		disabled: false,
		active: false,
		edited: false,
		hasError: false,
		badge: null,
		loading: false,
	},
);

defineEmits(['toggle-batch', 'toggle-raw']);

const { t } = useI18n();

const fieldName = computed(() => {
	return props.field.name || props.field.field;
});
</script>

<template>
	<div class="field-label type-label" :class="{ disabled, edited: edited && !batchMode && !hasError && !loading }">
		<span class="field-name">
			<span v-if="edited"  class="edit-dot"></span>
			<v-text-overflow :text="fieldName" />
			<v-icon
				v-if="field.meta?.required === true"
				class="required"
				:class="{ 'has-badge': badge }"
				sup
				name="star"
				filled
			/>
		</span>
	</div>
</template>

<style  scoped>
.field-label {
	position: relative;
	display: flex;
	margin-bottom: 8px;
	cursor: pointer;
	color: var(--theme--form--field--label--foreground);

	.v-text-overflow {
		display: inline;
		white-space: normal;
	}

	&.readonly {
		cursor: not-allowed;
	}

	.v-checkbox {
		height: 18px;
		margin-right: 4px;
	}

	.v-chip {
		margin: 0;
		flex-shrink: 0;
		margin-left: 3px;
	}

	.required {
		--utils-v-icon-color: var(--theme--primary);

		margin-left: 3px;

		&.has-badge {
			margin-right: 6px;
		}
	}

	.ctx-arrow {
		margin-top: -3px;
		color: var(--theme--foreground-subdued);
		opacity: 0;
		transition: opacity var(--fast) var(--transition);

		&.active {
			opacity: 1;
		}
	}

	&:hover {
		.ctx-arrow {
			opacity: 1;
		}
	}

	.raw-editor-toggle {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		height: 24px;
		width: 24px;
		margin-top: -2px;
		margin-left: 5px;
		color: var(--theme--foreground-subdued);
		transition: color var(--fast) var(--transition);

		&:hover {
			color: var(--theme--foreground);
		}

		&.active {
			color: var(--theme--primary);
			background-color: var(--theme--primary-background);
			border-radius: 50%;
		}
	}

	&.edited {
		.edit-dot {
			position: absolute;
			top: 7px;
			left: -7px;
			display: block;
			width: 4px;
			height: 4px;
			background-color: var(--theme--foreground-subdued);
			border-radius: 4px;
			content: '';
		}

		.field-name {
			margin-left: -16px;
			padding-left: 16px;
		}
	}

	@media (min-width: 960px) {
		display: block;

		.v-text-overflow {
			display: initial;
			white-space: nowrap;
		}

		.field-name {
			display: flex;
		}
	}
}

.type-label {
	font-family: var(--theme--form--field--label--font-family);
}
</style>
