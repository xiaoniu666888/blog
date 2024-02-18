<template>
    <div id="article-view">
        <md-preview v-model="text" style="width: 100%; padding: 0 10px; box-sizing: border-box;" />
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { MdPreview } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { userStore } from '@/stores/users';
import { getArticle } from '@/api/articles'
import { local } from '@/utils'
const useStore = userStore()
const text = ref(" ```vue \n <template>  \n    <MdEditor/>  \n </template> \n  ``` ");
onMounted(async () => {
    const article = local.get("acticleList")
    console.log(article);
    if (article) {

        text.value = article[0].res
    } else {
        let res = await getArticle({ noteAuthor: useStore.userInfo.username })
        local.set("acticleList", res)
        text.value = res
    }


})

</script>

<style scoped>
#article-view {
    width: 100%;
}
</style>


