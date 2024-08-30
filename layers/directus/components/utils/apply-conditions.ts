export function applyConditions(item: Record<string, any>, field: any) {
	if (field.meta && Array.isArray(field.meta?.conditions)) {
		return field;
	} else {
		return field;
	}
}
