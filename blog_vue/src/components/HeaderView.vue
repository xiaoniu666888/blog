<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router';
import { articleListStore, userStore } from '@/stores/users'

const useStore = userStore()
const useArticleStore = articleListStore()
// 默认头像地址
const avaUrl = ref("/api/images/default.jpg")
// 导航栏数据
const navTitles = reactive([
    {
        title: "首页",
        path: '/home',
        icon: 'house'
    },
    {
        title: "文章",
        path: '/home/article',
        icon: 'document'
    }, {
        title: "友链",
        path: '/home/link',
        icon: 'link'
    }, {
        title: "笔记",
        path: '/home/note',
        icon: 'notebook'
    }, {
        title: "关于",
        path: '/home/about',
        icon: 'connection'
    },

])
const router = useRouter()
// 当前导航
const currentIndex = ref()
// 点击logo
const ToHome = () => {
    router.push({ path: '/' })
}
// 点击修改个人信息
const handleInfo = () => {
    router.push('/home/info')
}
// 退出登录
const handleExit = () => {
    router.push({ path: '/' })
    useStore.delUserInfo()
    useArticleStore.delArticleList()
}
// 点击导航栏
const handleCilckNav = (index) => {
    currentIndex.value = index
}
</script>

<template>
    <header class="top-nav">
        <div class="title hidden-xs-only" @click="ToHome">
            🚀 Xiaoniu Blog
        </div>
        <div class="nav-list">
            <template v-for="(item, index) in navTitles" :key="index">
                <router-link @click="handleCilckNav(index)" :to="item.path" style="text-decoration: none;">
                    <span :class="['nav-title', currentIndex === index && 'active']">
                        <el-icon class="icons hidden-xs-only">
                            <component :is="item.icon" />
                        </el-icon>
                        <span>{{ item.title }}</span>
                    </span>
                </router-link>
            </template>
        </div>
        <!-- 头像 -->
        <div v-if="useStore.userInfo.username" class="avatar-box">
            <el-tooltip content="Bottom center" placement="bottom" effect="light" trigger="click">
                <el-avatar class="avatar" shape="square" size="default"
                    :src="'/api' + useStore.userInfo.userImg || avaUrl" />
                <template #content>
                    <span class="person" @click="handleInfo">个人信息</span>
                    <br>
                    <span class="exit" @click="handleExit">退出登录</span>
                </template>
            </el-tooltip>
        </div>

        <div class="login" v-else>
            <router-link to="/login" style="cursor: pointer; text-decoration: none;">
                <el-icon class="hidden-xs-only" :size="16" color="#46bceb"
                    style="vertical-align: middle; transform: translateY(-1px);">
                    <User />
                </el-icon>
                <span class="login-text">登录</span>
            </router-link>
        </div>
    </header>
    <main>

    </main>
</template>


<style lang="scss" scoped>
.top-nav {
    // width: 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    line-height: 50px;
    flex-wrap: nowrap;
    // background: linear-gradient(to right, #c2e5f2, #f2efe1);
    box-sizing: border-box;
    padding: 0 1vw;

    .title {
        color: #676767;
        cursor: pointer;
        padding-right: 40px;
        box-sizing: border-box;
    }


    .nav-list {
        flex: 1;

        .nav-title {
            padding: 0 7px;
            text-decoration: none;
            color: black;
            transition: all .5s ease;

            .icons {
                transform: translateY(2px);
                padding-right: 2px;
            }
        }

        .nav-title:hover {
            color: #87CEEB;
        }

        .active {
            color: #42bdee;
            transform: scale(1.2);
        }
    }

    .avatar-box {
        height: 50px;
        transform: translateY(5px);
        cursor: pointer;

        .avatar {

            transition: all .8s ease;
        }

        .avatar:hover {
            box-shadow: 0px 0px 2px 2px #87CEEB;
            transform: scale(1.1);
        }
    }

    .login {
        padding-right: 15px;
        box-sizing: border-box;
        transition: all .8s ease;

        .login-text {
            color: #46bceb;
            margin-left: 2px;
        }
    }

    .login:hover {
        transform: scale(1.1);
    }
}

.el-popper .person {
    border-bottom: 1px solid #eee;
}

.el-popper .person,
.el-popper .exit {
    display: inline-block;
    width: 100%;
    padding: 3px 15px;
    cursor: pointer;
    transition: all .5s ease;
    box-sizing: border-box;
    font-size: 16px;
}


.el-popper .person:hover {
    background-color: #eee;
    color: #87CEEB;
}

.el-popper .exit:hover {
    background-color: #eee;
    color: #87CEEB;
}
</style>