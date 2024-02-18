<script setup>
import { userStore } from '@/stores/users';
import { reactive, ref } from 'vue';
const useStore = userStore()
// 默认头像地址
const avaUrl = ref("/api/images/default.jpg")
const tags = reactive([
    {
        tag: 'html',
        type: 'success'
    }, {
        tag: 'css',
        type: 'primary'
    },
    {
        tag: 'js',
        type: 'primary'
    },
    {
        tag: 'vue',
        type: 'success'
    },
    {
        tag: 'node',
        type: 'primary'
    },
    {
        tag: 'mysql',
        type: 'success'
    },
    {
        tag: 'mysql',
        type: 'success'
    },
    {
        tag: 'mysql',
        type: 'success'
    }
])

// 个人介绍

const introduction = ref('00后一枚，热爱前端，热爱技术，喜欢钓鱼，目前学习前端两年半，芜湖~')

const popularTitle = reactive([
    {
        title: "HTML，一门赋予网站内容结构和意义的语言"


    },
    {
        title: "CSS，一门美化网站页面的语言"
    },
    {
        title: "JavaScript，用来为网站创建动态功能的脚本语言"
    }
])
</script>


<template>
    <div class="left">
        <header class="header">
            <el-card>
                <template #header>
                    <div class="card-header">
                        <span class="username" style=""> {{
                            useStore.userInfo.username }}</span>

                    </div>
                </template>
                <el-avatar :size="60" :src="'/api' + useStore.userInfo.userImg || avaUrl" />
                <template #footer>
                    <p class="introduction">
                        {{ introduction }}
                    </p>
                </template>

            </el-card>
        </header>
        <main class="main">
            <div class="personInfo">
                <!-- 分类 -->
                <div class="my-blog">
                    <div class="tags">
                        <el-card>
                            <template #header>
                                <div class="card-header">
                                    <span style="color: #49b2db; font-size: 18px; font-weight: 600;">博客分类</span>
                                </div>
                            </template>
                            <el-tag class="tag" v-for="(item, index) in tags" :key="index" :type="item.type">{{
                                item.tag }}</el-tag>
                        </el-card>
                    </div>
                </div>
                <!--  -->
            </div>
        </main>
        <footer class="footer">
            <el-card>
                <template #header>
                    <div class="card-header">
                        <span style="color: #49b2db; font-size: 18px; font-weight: 600;">热门文章</span>
                    </div>
                </template>

                <div v-for="item in popularTitle" :key="item" class="popular-title text item">{{ item.title }}</div>
            </el-card>

        </footer>

    </div>
</template>


<style lang="scss" scoped>
.left {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    // overflow-y: hidden;
    // overflow-y: scroll;

    .header {
        width: 100%;

        .username {
            color: #49b2db;
            font-size: 24px;
            font-weight: 600;
        }

        .introduction {
            text-align: left;
            text-indent: 2em;
            letter-spacing: 1.5px;
            line-height: 20px;
            // color: #7CCA54;
        }
    }

    .main {
        width: 100%;
        // flex: 1;

        .personInfo {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;

            .my-blog {
                width: 100%;
                text-align: center;

                // padding-bottom: 10px;

                .tags {
                    width: 100%;
                    text-align: center;

                    .tag {
                        text-align: left;
                        margin-top: 10px;
                        margin-right: 10px;
                        cursor: pointer;
                        font-size: 13px;
                        transition: all .5s ease;
                    }

                    .tag:hover {
                        transform: scale(1.1);
                    }

                }


            }
        }


    }

    .footer {
        width: 100%;

        .popular-title {
            cursor: pointer;
            transition: all .5s ease;
            padding: 2px 0;
            box-sizing: border-box;
            white-space: nowrap;
            /* 设置溢出内容隐藏 */
            overflow: hidden;

            /* 设置溢出内容以省略号显示 */
            text-overflow: ellipsis;
        }

        .popular-title:hover {
            background-color: #aaddf1;
            transform: scale(1.1);

        }
    }
}
</style>