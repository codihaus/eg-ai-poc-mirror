import { cloneDeep, orderBy } from 'lodash';
import { ComputedRef, Ref, computed } from 'vue';

export function getFormFields(fields: Ref<any[]>): ComputedRef<any[]> {
	return computed(() => {
		const systemFields: any[] = [];
		const userFields: any[] = [];

		const clonedFields = cloneDeep(fields.value);

		const sortedFields = orderBy(clonedFields, ['meta.group', 'meta.sort', 'meta.id'], ['desc', 'asc', 'asc']);

		for (let field of sortedFields) {
			const systemFake = field.field?.startsWith('$');
			if (systemFake) continue;


			if (!field.meta) {
				userFields.push(field);
				continue;
			}

			(field.meta.system ? systemFields : userFields).push(field);
		}

		return [
			...systemFields,
			...(systemFields.length > 0 && userFields.length > 0
				? [
						{
							field: '$system_divider',
							type: 'alias',
							meta: { interface: 'presentation-divider', group: null },
							hideLabel: true,
							hideLoader: true,
						} as unknown as any,
				  ]
				: []),
			...userFields,
		];
	});
}
