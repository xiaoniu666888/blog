import { createRouter, createWebHashHistory } from 'vue-router';
import { local, message } from '@/utils';

// 路由表
const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/HomeView.vue'),
        redirect: '/home/welcome',
        children: [
            {
                path: 'welcome',
                name: 'welcome',
                meta: {
                    title: '欢迎首页'
                },
                component: () => import('../views/WelcomeView.vue')
            },
            {
                path: 'article',
                name: 'article',
                meta: {
                    title: '文章列表'
                },
                component: () => import('../views/ArticleView.vue')
            },

            {
                path: 'note',
                name: 'note',
                meta: {
                    title: '上传笔记',
                    islogin: true
                },
                component: () => import('../views/NoteView.vue')
            },

            {
                path: 'link',
                name: 'link',
                meta: {
                    title: '友链列表'
                },
                component: () => import('../views/LinkView.vue')
            },
            {
                path: 'about',
                name: 'about',
                meta: {
                    title: '关于'
                },
                component: () => import('../views/AboutView.vue')
            },
            {
                path: 'info',
                name: 'info',
                component: () => import('../views/InfoView.vue')
            },
            {
                path: 'detail/:id',
                name: 'detail',
                meta: {
                    title: '文章详情'
                },
                component: () => import('../views/ArticleDetailView.vue')
            },
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/LoginView.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notfound',
        component: () => import('../views/NotFound.vue')
    }
]

const router = createRouter({
    routes,
    history: createWebHashHistory()
})

router.beforeEach(async (to, from) => {
    if (to.meta.islogin) {
        const res = local.get("userInfo")
        if (!res) {
            message('请先登录', 401)
            return { path: from.path }
        }
    }
})
export default router