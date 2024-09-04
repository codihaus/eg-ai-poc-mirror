<template>
    <form @submit.prevent="handleSubmit" ref="formRef" :class="{ 'border-base-300': isFocus }" class='p-3 border border-base-100 shadow-sm rounded-xl duration-100'>

        <!-- <ContnetChatDisplayFiles v-if="dataForm['files']?.length" :files="dataForm['files']" @onRemoveFile="hanldeRemoveFile" class="mb-6" /> -->

        <NInput
            @focus="isFocus = true"
            v-model:value="dataForm['message']"
            class='pl-2'
            placeholder="Ask anything..."
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 10 }"
            @keydown="handleKeydown"
        >
            <template class="flex-between" #suffix>
                <button type='submit' :class="{ 'text-white bg-base-900': isHasValue }" class="p-2 rounded-full bg-base-50 hover:(text-white bg-base-900) duration-100">
                    <div class='i-solar:arrow-right-linear size-5'></div>
                </button>
            </template>
        </NInput>
    </form>
</template>

<script setup lang='ts'>
import ContnetChatDisplayFiles from './contnet-chat-display-files.vue';
import ContentChatInputFile from './content-chat-input-file.vue';
const isFocus = ref(false);
const formRef = ref<HTMLFormElement | null>(null);

interface TypeForm {
    message: string;
    files: File[] | any;
}

onClickOutside(formRef, () => {
    isFocus.value = false;
});

const emit = defineEmits<{
    onSubmit: [any];
}>();

const dataForm = ref<TypeForm>({
    message: '',
    files: [] as File[],
});

const isHasValue = computed(() => {
    return Object.values(dataForm.value).some(value => {
        return (typeof value === 'string' && value !== '') ||
            (Array.isArray(value) && value.length > 0);
    });
});

const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
    }
};

const handleSubmit = () => {
    if (isHasValue.value) {
        emit('onSubmit', dataForm.value);
        dataForm.value.message = '';
    }
};


const onChangeFile = (fileList: File[]) => {
    if (!fileList?.length) return;
    // @ts-ignore
    dataForm.value.files.push(...fileList);
};

function hanldeRemoveFile(file: File) {
    dataForm.value.files = dataForm.value.files.filter((f: File) => f !== file);
}

</script>

<style scoped>
:deep(.n-input .n-input__border) {
    border: none;
}

:deep(.n-input .n-input-wrapper) {
    padding: 0;
}

:deep(.n-input) {
    --n-border-focus: transparent;
    --n-border-hover: transparent;
    --n-box-shadow-focus: transparent;
}
</style>