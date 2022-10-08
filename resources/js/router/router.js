import { createRouter, createWebHistory } from 'vue-router';
import home from '../pages/home.vue';
import posts from '../pages/posts.vue';
import post from '../pages/post.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: home
        },
        {
            path: '/posts',
            name: 'posts',
            component: posts
        },
        {
            path: '/post/:id',
            name: 'post',
            component: post
        },
    ]
})

export default router