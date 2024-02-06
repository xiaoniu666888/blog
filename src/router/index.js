import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        // redirect: '/home/article',
        component: () => import('../views/HomeView.vue'),
        children: [
            {
                path: 'article',
                component: () => import('../views/ArticleView.vue')
            }
        ]
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutView.vue')
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