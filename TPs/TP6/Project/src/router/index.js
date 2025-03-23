import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreatePostView from '../views/CreatePostView.vue'
import PostDetailView from '../views/PostDetailView.vue'
import TagPostsView from '../views/TagPostsView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/create',
    name: 'create',
    component: CreatePostView
  },
  {
    path: '/posts/:id',
    name: 'postDetail',
    component: PostDetailView,
    props: true
  },
  {
    path: '/edit/:id',
    name: 'editPost',
    component: CreatePostView,
    props: true
  },
  {
    path: '/tags/:tag',
    name: 'tagPosts',
    component: TagPostsView,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
