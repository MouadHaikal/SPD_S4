import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import AddJob from '../views/AddJob.vue';
import EditJob from '../views/EditJob.vue';
import JobDetail from '../components/JobDetail.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/add',
        name: 'AddJob',
        component: AddJob
    },
    {
        path: '/jobs/:id',
        name: 'JobDetail',
        component: JobDetail,
        props: true // Pass route params as props to the component
    },
    {
        path: '/jobs/:id/edit',
        name: 'EditJob',
        component: EditJob,
        props: true // Pass route params as props to the component
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
