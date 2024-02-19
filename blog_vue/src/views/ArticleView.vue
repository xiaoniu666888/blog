<script setup>
import { onMounted, ref } from 'vue';
import { userStore } from '@/stores/users';
import { getArticle } from '@/api/articles'
import { useRouter } from 'vue-router';
import fmtdate from '@/utils/fmtdate';

const router = useRouter()
const useStore = userStore()

const articleList = ref()

onMounted(async () => {


    let res = await getArticle({ noteAuthor: useStore.userInfo.username })
    articleList.value = res


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
    <div id="article-view">
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
                            {{ item.selectedType.type }}
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
    </div>
</template>



<style scoped>
#article-view {
    width: 100%;

    .article {
        display: flex;
        width: 45vw;
        height: 25vh;
        margin: 1vw auto;
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



}
</style>


