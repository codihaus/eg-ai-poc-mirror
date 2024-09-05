<template>
    <div class="flex flex-wrap gap-2 text-gray-600 font-bold text-xs">
        <div v-for="(file, index) in files" :key="file.name" class="flex items-center gap-2 p-2 bg-base-50 rounded-lg">
            <div class="i-custom-attachment size-5 "></div>
            <span class="line-clamp-1 ">{{index+1}}. {{ getFileWithoutExtension(file.name) }}</span>
            <!-- <button v-if="isCustomFile(file)" @click="$emit('onRemoveFile', file)" class="i-solar-x size-4.5 bg-base-600 hover:bg-danger"></button> -->
        </div>
    </div>
</template>

<script setup lang='ts'>

type CustomFile = { name: string; link: string; id: string };
type FileType = File | CustomFile;

defineProps<{
    files: FileType[];
}>();

const emit = defineEmits<{
    onRemoveFile: [FileType | any];
}>();


function isCustomFile(file: FileType): file is CustomFile {
    return !(file as CustomFile).link
}

function getFileWithoutExtension(name: string = '') {
    let nameArr = name.split('.')
    nameArr.pop()
    return nameArr.join('')
}
</script>