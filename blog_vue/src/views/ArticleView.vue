<script setup>
import { onMounted, ref, reactive } from 'vue';
import { userStore, articleListStore } from '@/stores';
import { getArticle } from '@/api/articles'
import { useRouter } from 'vue-router';
import fmtdate from '@/utils/fmtdate';

const router = useRouter()
const useStore = userStore()
const useArticleStore = articleListStore()
const articleList = ref()

onMounted(async () => {
    if (!useArticleStore.articleList.length) {
        getArticleList()
    } else {
        articleList.value = useArticleStore.articleList
        pager.total = useArticleStore.total
    }
})
// 获取文章
const getArticleList = async () => {
    // 根据作者和分页器的限制进行查询
    let params = {
        noteAuthor: useStore.userInfo.username,
        ...pager
    }
    try {
        let { list, page } = await getArticle(params)
        articleList.value = list
        pager.total = page.total
        useArticleStore.saveArticleList(list)
        useArticleStore.total = page.total
    } catch (error) {
        console.error(error)
    }
    console.log(111);

}
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

// 初始化分页对象
const pager = reactive({
    currentPage: 1, // 当前是第几页
    pageSize: 6, // 每页显示几条数据
    total: 100 // 总条目数，通常来自后端 

    // total / pageSize = 页数
})
// 处理分页器当前页变化  
function handleCurrentChange(newPage) {
    pager.currentPage = newPage;
    getArticleList()
}  
</script>

<template>
    <div id="article-view">
        <!-- 文章列表 -->
        <main>
            <div class="article" @click="handleToArticleDetail(item._id)" v-for="item in articleList" :key="item._id">
                <div class="article_img">
                    <el-image style="width: 100%;
                height: 100%;
              " fit="cover" :src="'/api' + item.noteImgUrl" alt="" />
                </div>
                <div class="article_info">
                    <header class="article_header">{{ item.title }}</header>
                    <main class="article_main">
                        <span>
                            <el-icon style="vertical-align: middle; transform: translateY(-1.5px);">
                                <Document />
                            </el-icon>
                            发布于{{ fmtdate(item.noteUpDate) }}
                        </span> |

                        <span>
                            <el-icon style="vertical-align: middle; transform: translateY(-1.5px);">
                                <Folder />
                            </el-icon>
                            {{ item.selectedType }}
                        </span> |
                        <span>
                            <el-icon style="vertical-align: middle; transform: translateY(-1.5px);">
                                <PriceTag />
                            </el-icon>
                            {{ item.selectedTag }}
                        </span>

                    </main>
                    <footer class=" article_footer_desc">{{ item.desc }}</footer>
                </div>
            </div>
        </main>
        <!-- 分页器 -->
        <footer class="article_view_footer">
            <el-pagination background :total="pager.total" @current-change="handleCurrentChange"
                v-model:current-change="pager.currentPage" v-model:page-size="pager.pageSize"
                :hide-on-single-page="true" style="--el-color-primary: #00aaa2; display: inline-flex;"
                layout="prev, pager, next" />
        </footer>
    </div>
</template>



<style lang="scss" scoped>
#article-view {
    width: 100%;
    overflow-x: hidden;

    .article {
        display: flex;
        /* width: 45vw; */
        height: 25vh;
        margin: 0 2vw;
        margin-bottom: 2vh;
        box-sizing: border-box;
        align-items: center;
        box-shadow: 0px 0px 5px 2px #efe3e3;

        .article_img {
            width: 40%;
            height: 100%;
            box-sizing: border-box;
            object-fit: cover;
            cursor: pointer;
            transition: all .3s ease;
        }

        .article_img:hover {
            transform: scale(1.01);
        }

        .article_info {
            width: 60%;
            display: flex;
            flex-direction: column;
            padding: 0 3vh;
            box-sizing: border-box;
            line-height: 1.5rem;
            cursor: pointer;
            transition: all .3s ease;

            .article_header {
                font-size: 26px;
                font-weight: 600;
            }

            .article_main {
                font-size: 14px;
                color: #333;
                padding: 2vh 0;
                box-sizing: border-box;



            }

            .article_footer_desc {
                color: #222;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }

        .article_info:hover {
            transform: scale(1.01);
        }

    }

    @media (max-width: 768px) {
        .article {
            width: 85vw;
        }
    }

    .article_view_footer {
        text-align: center;
        padding: 2vh 0;
    }


}
</style>
