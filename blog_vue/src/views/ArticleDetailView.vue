<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router'
import { MdPreview } from 'md-editor-v3';
import { getArticleDetail } from '@/api/articles'
import 'md-editor-v3/lib/style.css';
import fmtdate from '@/utils/fmtdate';
const route = useRoute()

onMounted(() => {
    getDetail()
})
watch(route, () => {
    getDetail()
})
const getDetail = async () => {
    const { id } = route.params
    const res = await getArticleDetail({ id })
    if (res) {
        articleDetail.value = { ...res }
        text.value = res.detail
    } else {
        return false
    }
}

const publishTime = computed(() => {
    return fmtdate(articleDetail.value.noteUpDate)
})
const text = ref(' # Hello Editor ');
// 文章详细信息
const articleDetail = ref(
    {
        title: '',
        detail: '',
        noteUpDate: '',
        selectedTag: '',
        selectedType: {
            id: 1,
            tags: ["html", "css", "js"],
            type: '333'
        }
    }
)


</script>

<template>
    <div id="article_detail">
        <header class="article_info">
            <div class="article_title"> {{ articleDetail.title }} </div>
            <span class="article_type">
                <span>
                    <el-icon style="vertical-align: middle; transform: translateY(-1.5px);">
                        <Document />
                    </el-icon> 发布于： {{ publishTime }}
                </span>
                |
                <span>
                    <el-icon style="vertical-align: middle; transform: translateY(-1.5px);">
                        <Folder />
                    </el-icon> {{ articleDetail.selectedType }}
                </span>
                |
                <span>
                    <el-icon style="vertical-align: middle; transform: translateY(-1.5px);">
                        <PriceTag />
                    </el-icon> {{ articleDetail.selectedTag }}
                </span>
            </span>
        </header>

        <main class="md_view">
            <md-preview v-model="text" style="width: 100%; box-sizing: border-box;background: linear-gradient(to right, #9fe1fa, #f4edc9);
" />
        </main>

    </div>
</template>

<style lang="scss" scoped>
#article_detail {
    min-height: 100%;
    background: linear-gradient(to right, #9fe1fa, #f4edc9);
    box-sizing: border-box;

    .article_info {

        text-align: center;
        border-bottom: 2px dashed #42bdee;
        padding: 1vh 0;
        box-sizing: border-box;

        .article_title {
            font-size: 26px;
            font-weight: 600;
            padding: 2vh 0;
            box-sizing: border-box;


        }

        .article_type {
            span {
                transition: all .5s ease;
            }

            span:nth-last-child(-n+2) {
                cursor: pointer;
            }

            span:nth-last-child(-n+2):hover {
                color: #42bdee;

            }
        }
    }
}


.animate__animated,
.animate__fadeInDown {
    transition: none;
    animation: none;
}
</style>