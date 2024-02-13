import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/HomeView.vue'),
        children: [
            {
                path: 'article',
                component: () => import('../views/ArticleView.vue')
            },

            {
                path: 'note',
                name: 'note',
                component: () => import('../views/NoteView.vue')
            },

            {
                path: 'link',
                name: 'link',
                component: () => import('../views/LinkView.vue')
            },
            {
                path: 'about',
                name: 'about',
                component: () => import('../views/AboutView.vue')
            },
            {
                path: 'info',
                name: 'info',
                component: () => import('../views/InfoView.vue')
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

export default router