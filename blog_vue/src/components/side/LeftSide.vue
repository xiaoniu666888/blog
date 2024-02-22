<script setup>
import { userStore } from '@/stores/users';
import { local } from '@/utils';
import { reactive } from 'vue';
const useStore = userStore()
const token = local.get("userInfo")
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
// 介绍假数据
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
        <!-- 头部 -->
        <header class="header">
            <el-card style="background: radial-gradient(circle at 10% 20%, rgb(239, 246, 249) 0%, rgb(206, 239, 253) 90%);">
                <template #header>
                    <div class="card-header">
                        <span class="username" style=""> {{
                            useStore.userInfo.nickname || "游客" }} </span>
                    </div>
                </template>
                <el-avatar v-if="token" :size="60" :src="'/api' + useStore.userInfo.userImg || '/imgs/avatar.jpg'" />
                <el-avatar v-else :size="60" src='/imgs/avatar.jpg' />
                <template #footer>
                    <p class="introduction">
                        {{ useStore.userInfo.introduction || '暂无介绍' }}
                    </p>
                </template>
            </el-card>
        </header>
        <!-- 中间 -->
        <main class="main">
            <div class="personInfo">
                <!-- 分类 -->
                <div class="my-blog">
                    <div class="tags">
                        <el-card
                            style="background: radial-gradient(circle at 10% 20%, rgb(239, 246, 249) 0%, rgb(206, 239, 253) 90%);">
                            <template #header>
                                <div class="card-header">
                                    <span style="color: #676767; font-size: 18px; font-weight: 600;">博客分类</span>
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
        <!-- 底部 -->
        <footer class="footer">
            <el-card style="background: radial-gradient(circle at 10% 20%, rgb(239, 246, 249) 0%, rgb(206, 239, 253) 90%);">
                <template #header>
                    <div class="card-header">
                        <span style="color: #676767; font-size: 18px; font-weight: 600;">推荐文章</span>
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
    min-height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    .header {
        width: 100%;

        .username {
            color: #676767;
            font-size: 24px;
            font-weight: 600;
        }

        .introduction {
            text-align: left;
            letter-spacing: 1.5px;
            line-height: 20px;
        }
    }

    .main {
        width: 100%;

        .personInfo {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;

            .my-blog {
                width: 100%;
                text-align: center;

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