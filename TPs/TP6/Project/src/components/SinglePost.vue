<template>
  <div class="card p-4 mb-4">
    <div class="mb-2">
      <h2 class="text-xl font-bold text-indigo-400">{{ post.title }}</h2>
      <div class="flex flex-wrap mt-2">
        <span v-for="tag in tags" :key="tag" class="tag">
          {{ tag }}
        </span>
      </div>
    </div>
    <p class="text-gray-300 mb-4">{{ snippet }}</p>
    <div class="flex justify-between items-center">
      <router-link :to="{ name: 'postDetail', params: { id: post.id } }" class="btn">
        Read More
      </router-link>
      <div class="space-x-2">
        <router-link :to="{ name: 'editPost', params: { id: post.id } }" class="text-yellow-500 hover:text-yellow-400">
          Edit
        </router-link>
        <button @click="handleDelete" class="text-red-500 hover:text-red-400">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['delete'])

// Create a snippet from the post body
const snippet = computed(() => {
  return props.post.body.substring(0, 100) + '...'
})

// Split tags string into array
const tags = computed(() => {
  return props.post.tags.split(',').map(tag => tag.trim())
})

// Handle delete action
const handleDelete = async () => {
  if (confirm('Are you sure you want to delete this post?')) {
    try {
      await fetch(`http://localhost:3000/posts/${props.post.id}`, {
        method: 'DELETE'
      })
      emit('delete', props.post.id)
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }
}
</script>
