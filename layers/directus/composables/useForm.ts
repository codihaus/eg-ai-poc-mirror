import {computed, ref, watch} from "vue";
import {cloneDeep, isEqual, isNil} from "lodash";
import {getDefaultValuesFromFields} from "@directusLayer/components/utils/get-default-values-from-fields";
import {getFormFields} from "@directusLayer/components/v-form/utils/get-form-fields";
import {applyConditions} from "@directusLayer/components/utils/apply-conditions";
import {updateSystemDivider} from "@directusLayer/components/v-form/utils/update-system-divider";
import {updateFieldWidths} from "@directusLayer/components/v-form/utils/update-field-widths";
import {Field, FormField as TFormField} from "@directusLayer/components/v-form/types";

export function useForm(props, values) {
    const fields = ref<any[]>(getFields());

    watch(
        () => props.fields,
        () => {
            const newVal = getFields();

            if (!isEqual(fields.value, newVal)) {
                fields.value = newVal;
            }
        },
    );

    const defaultValues = getDefaultValuesFromFields(fields);

    const formFields = getFormFields(fields);

    const fieldsWithConditions = computed(() => {
        const valuesWithDefaults = Object.assign({}, defaultValues.value, values.value);

        let fields = formFields.value.map((field) => applyConditions(valuesWithDefaults, setPrimaryKeyReadonly(field)));

        updateSystemDivider(fields);
        updateFieldWidths(fields);

        return fields;
    });

    const fieldsMap = computed<Record<string, TFormField | undefined>>(() => {
        return Object.fromEntries(fieldsWithConditions.value.map((field) => [field.field, field]));
    });

    const fieldNames = computed(() => {
        const fieldsInGroup = formFields.value.filter(
            (field) => field.meta?.group === props.group || (props.group === null && isNil(field.meta?.group)),
        );
        return fieldsInGroup.map((field) => field.field);
    });

    const fieldsForGroup = computed(() => {
        return fieldNames.value.map((name) => getFieldsForGroup(fieldsMap.value[name]?.meta?.field || null));
    });

    return {fieldNames, fieldsMap, isDisabled, getFieldsForGroup, fieldsForGroup};

    function isDisabled(field: TFormField | undefined) {
        if (!field) return true;
        const meta = fieldsMap.value?.[field.field]?.meta;

        return [
            props.loading,
            props.disabled,
            meta?.readonly === true,
            field.schema?.is_generated === true
        ].indexOf(true) !== -1;
    }

    function getFieldsForGroup(group: null | string, passed: string[] = []): Field[] {
        const fieldsInGroup = fieldsWithConditions.value.filter((field) => {
            const meta = fieldsMap.value?.[field.field]?.meta;
            return meta?.group === group || (group === null && isNil(meta));
        });

        for (const field of fieldsInGroup) {
            const meta = fieldsMap.value?.[field.field]?.meta;

            if (meta?.special?.includes('group') && !passed.includes(meta!.field!)) {
                passed.push(meta!.field!);
                fieldsInGroup.push(...getFieldsForGroup(meta!.field!, passed));
            }
        }

        return fieldsInGroup;
    }

    function getFields(): Field[] {
        if (props.fields) {
            return props.fields;
        }

        throw new Error('[v-form]: You need to pass either the collection or fields prop.');
    }

    function setPrimaryKeyReadonly(field: Field) {
        if (
            field.schema?.is_primary_key === true &&
            props.primaryKey !== '+' &&
            (field.schema?.has_auto_increment === true || field.meta?.special?.includes('uuid'))
        ) {
            const fieldClone = cloneDeep(field) as any;
            if (!fieldClone.meta) fieldClone.meta = {};
            fieldClone.meta.readonly = true;
            return fieldClone;
        }

        return field;
    }
}
