import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/components/HomePage'
import Login from '@/components/Login'
const routes = [{
        name: 'Home',
        path: '/',
        component: HomePage,
        meta: { requiresAuth: true },
        props: { isLoggedIn: false }
    },
    {
        name: 'Login',
        path: '/login',
        component: Login
    }
]
const router = createRouter({ history: createWebHistory(), routes })
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        if (localStorage.getItem('user') != 'null') {
            next()
            return
        } else {
            next('/login')
        }
    } else {
        next()
    }
    if ((to.meta.name == 'Login') && localStorage.getItem('user') != 'null') {
        next('/')
    }
})

export default router;