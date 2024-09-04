<template>
    <label :for="idInput" class="flex-items p-2 rounded-full hover:(bg-base-100) duration-100 cursor-pointer ">
        <div class='i-solar:add-circle-bold size-5 text-gray-500'>
            <input @change="onFileChange" v-bind="$attrs" type="file" class="invisible w-0" :id="idInput" multiple />
        </div>
        <span class="ml-1" v-if="label">{{ label }}</span>
    </label>
</template>

<script setup lang='ts'>
defineProps<{
    label?: string;
}>();
const emit = defineEmits<{
    onChangeFile: [any];
}>();

function onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    emit('onChangeFile', target.files);
}

const idInput = useId();
</script>
