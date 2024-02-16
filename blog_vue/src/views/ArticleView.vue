<template>
    <div id="article-view">
        <md-preview v-model="text" style="width: 100%; padding: 0 10px;" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { MdPreview } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const text = ref(" ```vue \n <template>  \n    <MdEditor/>  \n </template> \n  ``` ");


</script>

<style scoped>
#article-view {
    width: 100%;
}
</style>