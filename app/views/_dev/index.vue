<template>
    <div class="container">
        <p>This is Dev</p>
        <pre>{{ data }}</pre>
    </div>
</template>

<script setup lang="ts">
// import {useMenuDto} from "./composables/menu"

const { readByQueryMenu, readOneMenu } = useMenuDto();

const data = await readByQueryMenu();
</script>
