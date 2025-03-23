<template>
  <div class="w-full">
    <div v-if="loading" class="text-center py-10">
      <p class="text-indigo-400 text-xl">Loading posts...</p>
    </div>
    <div v-else-if="error" class="bg-red-900 p-4 rounded text-white mb-4">
      {{ error }}
    </div>
    <div v-else-if="posts.length === 0" class="text-center py-10">
      <p class="text-gray-400 text-xl">No posts found.</p>
    </div>
    <div v-else>
      <SinglePost 
        v-for="post in posts" 
        :key="post.id" 
        :post="post" 
        @delete="handlePostDelete"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import SinglePost from './SinglePost.vue'
import getPosts from '../composables/getPosts'

const props = defineProps({
  tag: {
    type: String,
    default: null
  }
})

const { posts, error, loading, load } = getPosts(props.tag)

onMounted(load)

// Handle post deletion by reloading the posts
const handlePostDelete = () => {
  load()
}
</script>
