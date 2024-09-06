<template>
    <form @submit.prevent="handleSubmit" ref="formRef" :class="{ 'bg-base-100/80': isFocus }" class='py-2 px-3  bg-base-50 rounded-xl duration-100'>
        <!-- <ContnetChatDisplayFiles v-if="dataForm['files']?.length" :files="dataForm['files']" @onRemoveFile="hanldeRemoveFile" class="mb-6" /> -->
        <div class="flex items-end gap-1">
            <!-- <ContentChatInputFile @onChangeFile="onChangeFile" /> -->
            <NInput v-model:value="dataForm['message']" placeholder="Ask follow-up" type="textarea" @focus="isFocus = true" @keydown="handleKeydown"
                :autosize="{ minRows: 1, maxRows: 10 }" />

            <button type='submit' :class="{ 'text-white bg-base-900': isHasValue && !AIStreaming }"
                class="p-2 rounded-full bg-base-50 hover:(text-white bg-base-900) duration-100">
                <div class='i-custom-arrow-right size-5'></div>
            </button>

        </div>
    </form>

</template>

<script setup lang='ts'>
import ContnetChatDisplayFiles from './contnet-chat-display-files.vue';
import ContentChatInputFile from './content-chat-input-file.vue';
const isFocus = ref(false);
const formRef = ref<HTMLFormElement | null>(null);

interface FormData {
    message: string;
    files: File[] | any;
}

const AIStreaming = useState('AIStreaming', () => false)

onClickOutside(formRef, () => {
    isFocus.value = false;
});

const emit = defineEmits<{
    onSubmit: [FormData];
}>();
const dataForm = ref({
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
    if (isHasValue.value && AIStreaming.value !== true) {
        emit('onSubmit', dataForm.value);
        dataForm.value.message = '';
    }
};

function onChangeFile(fileList: File[]) {
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
    --n-color: transparent;
}

:deep(.n-input.n-input--textarea) {
    background-color: transparent;
}

:deep(.n-input.n-input--textarea) {
    padding: 0;
    --n-padding-vertical: 6px;
}
</style>