<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getArticleListByTag } from '@/api/articles'
import fmtdate from '@/utils/fmtdate';
const route = useRoute()
const router = useRouter()
const title = ref('')
const articleList = ref([])
onMounted(() => {
    getAcvtileList()
})
const getAcvtileList = async () => {
    const { tag } = route.query
    if (tag) {
        title.value = tag
        let params = {};
        params.tag = tag
        const res = await getArticleListByTag(params)
        articleList.value = res
    }


}
watch(route, () => {
    getAcvtileList()
})
const handleToArticleDetail = (id) => {
    if (id) {
        router.push(
            {
                name: 'detail',
                params: {
                    id
                }
            }
        )
    } else {
        throw new Error("跳转id不存在")
    }
} 
</script>


<template>
    <div>
        <div id="article-view">
            <h2 class="title">#{{ title }}</h2>
            <!-- 文章列表 -->
            <main class="main">
                <div class="article animate__animated animate__backInLeft" v-for="item in articleList" :key="item._id"
                    @click="handleToArticleDetail(item._id)">
                    <div class="article_img">
                        <el-image style="width: 100%;
                height: 100%;
              " fit="cover" :src="'/api' + item.noteImgUrl" alt="文章缩略图" title="文章缩略图" />
                    </div>
                    <div class="article_info">
                        <header class="article_header"> {{ item.title }} </header>
                        <main class="article_main">
                            <span>
                                <el-icon style="vertical-align: middle; transform: translateY(-1.5px);">
                                    <Document />
                                </el-icon>
                                发布于：{{ fmtdate(item.noteUpDate).slice(0, 10) }}
                            </span>
                        </main>
                    </div>
                </div>
            </main>
            <!-- 分页器 -->
            <!-- <footer class="article_view_footer">
            <el-pagination background :total="pager.total" @current-change="handleCurrentChange"
                v-model:current-change="pager.currentPage" v-model:page-size="pager.pageSize" :hide-on-single-page="true"
                style="--el-color-primary: #00aaa2; display: inline-flex;" layout="prev, pager, next" />
        </footer> -->
        </div>
    </div>
</template>


<style scoped>
#article-view {
    width: 100%;
    overflow-x: hidden;
    text-align: center;

    .title {
        color: #42bdee;
        font-size: 20px;
        font-weight: bold;
        padding-bottom: 20px;
        margin-top: 5px;
    }

    .main {
        min-width: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        /* grid-gap: 5px; */
        padding: 20px 10px;
        box-sizing: border-box;
        justify-items: center;
        /* 水平居中 */
        align-items: center;
        box-sizing: border-box;

        /* 垂直居中 */
        .article {
            display: flex;
            flex-direction: column;
            width: 90%;
            min-height: 40px;
            box-sizing: border-box;
            align-items: left;
            box-shadow: 0px 0px 5px 2px #efe3e3;

            .article_img {
                box-sizing: border-box;
                object-fit: cover;
                cursor: pointer;
                transition: all .3s ease;
            }

            .article_img:hover {
                transform: scale(1.01);
            }

            .article_info {
                display: flex;
                flex-direction: column;
                padding: 0 3vh;
                line-height: 1.5rem;
                cursor: pointer;
                transition: all .3s ease;
                text-align: left;
                box-sizing: border-box;

                .article_header {
                    font-size: 19px;
                    font-weight: 700;
                }

                .article_main {
                    font-size: 14px;
                    color: #333;
                    padding: 2vh 0;
                    box-sizing: border-box;
                }

            }

            .article_info:hover {
                color: #42bdee
            }
        }

        @media (max-width: 768px) {
            .article {
                width: 85vw;
            }
        }

    }

    @media (max-width: 768px) {
        .main {
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            /* grid-gap: 5px; */
            padding: 20px 10px;
            box-sizing: border-box;
            justify-items: center;
            /* 水平居中 */
            align-items: center;
            box-sizing: border-box;
        }
    }




}
</style>