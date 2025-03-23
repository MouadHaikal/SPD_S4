<template>
  <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
    <div class="lg:col-span-3">
      <div v-if="loading" class="text-center py-10">
        <p class="text-indigo-400 text-xl">Loading post...</p>
      </div>
      <div v-else-if="error" class="bg-red-900 p-4 rounded text-white mb-4">
        {{ error }}
      </div>
      <div v-else-if="post" class="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 class="text-3xl font-bold mb-4 text-indigo-400">{{ post.title }}</h1>
        
        <div class="flex flex-wrap mb-6">
          <router-link 
            v-for="tag in tags" 
            :key="tag"
            :to="{ name: 'tagPosts', params: { tag } }"
            class="tag"
          >
            {{ tag }}
          </router-link>
        </div>
        
        <div class="prose prose-invert max-w-none">
          <p class="text-gray-300 whitespace-pre-line">{{ post.body }}</p>
        </div>
        
        <div class="mt-8 flex justify-between">
          <router-link to="/" class="px-4 py-2 bg-gray-700 rounded text-white hover:bg-gray-600 transition duration-300">
            Back to Posts
          </router-link>
          <div class="space-x-2">
            <router-link :to="{ name: 'editPost', params: { id: post.id } }" class="btn bg-yellow-600 hover:bg-yellow-700">
              Edit
            </router-link>
            <button @click="handleDelete" class="btn bg-red-600 hover:bg-red-700">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="lg:col-span-1">
      <TagCloud />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import getPost from '../composables/getPost'
import TagCloud from '../components/TagCloud.vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const router = useRouter()
const { post, error, loading, load } = getPost(props.id)

// Split tags string into array
const tags = computed(() => {
  return post.value?.tags?.split(',').map(tag => tag.trim()) || []
})

onMounted(load)

// Handle post deletion
const handleDelete = async () => {
  if (confirm('Are you sure you want to delete this post?')) {
    try {
      const response = await fetch(`http://localhost:3000/posts/${props.id}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) {
        throw new Error('Failed to delete post')
      }
      
      router.push('/')
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }
}
</script>
