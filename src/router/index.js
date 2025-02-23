import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import AuthPage from "@/components/AuthPage.vue";
import EmbeddingGraph from "@/components/EmbeddingGraph.vue";
import ResourceDetail from "@/components/ResourceDetail.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/auth',
        name: 'Auth',
        component: AuthPage
    },
    {
        path: '/embedding',
        name: 'Embedding',
        component: EmbeddingGraph
    },
    {
        path: '/resDetail/:resourceId',
        name: 'ResourceDetail',
        component: ResourceDetail
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
