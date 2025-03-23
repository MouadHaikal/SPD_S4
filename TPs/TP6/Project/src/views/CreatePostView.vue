<template>
  <div>
    <h1 class="text-3xl font-bold mb-6 text-indigo-400">
      {{ id ? 'Edit Post' : 'Create New Post' }}
    </h1>
    
    <div v-if="loading" class="text-center py-10">
      <p class="text-indigo-400 text-xl">Loading post...</p>
    </div>
    <div v-else-if="error" class="bg-red-900 p-4 rounded text-white mb-4">
      {{ error }}
    </div>
    
    <form v-else @submit.prevent="handleSubmit" class="bg-gray-800 p-6 rounded-lg">
      <div class="mb-4">
        <label for="title" class="block text-sm font-medium text-gray-300 mb-2">Title</label>
        <input 
          type="text" 
          id="title" 
          v-model="title" 
          required
          class="form-input"
        />
      </div>
      
      <div class="mb-4">
        <label for="body" class="block text-sm font-medium text-gray-300 mb-2">Content</label>
        <textarea 
          id="body" 
          v-model="body" 
          rows="8" 
          required
          class="form-input"
        ></textarea>
      </div>
      
      <div class="mb-6">
        <label for="tags" class="block text-sm font-medium text-gray-300 mb-2">Tags (comma separated)</label>
        <input 
          type="text" 
          id="tags" 
          v-model="tags" 
          placeholder="vue, javascript, webdev"
          class="form-input"
        />
      </div>
      
      <div class="flex justify-between">
        <button type="submit" class="btn" :disabled="isSubmitting">
          {{ id ? 'Update Post' : 'Add Post' }}
        </button>
        <router-link to="/" class="px-4 py-2 bg-gray-700 rounded text-white hover:bg-gray-600 transition duration-300">
          Cancel
        </router-link>
      </div>
      
      <div v-if="formError" class="mt-4 p-3 bg-red-900 text-white rounded">
        {{ formError }}
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import getPost from '../composables/getPost'

const props = defineProps({
  id: {
    type: String,
    default: null
  }
})

const router = useRouter()

// Form data
const title = ref('')
const body = ref('')
const tags = ref('')
const formError = ref(null)
const isSubmitting = ref(false)

// If editing, load the post data
const { post, error, loading, load } = props.id ? getPost(props.id) : { post: null, error: null, loading: false, load: () => {} }

onMounted(async () => {
  if (props.id) {
    await load()
    if (post.value) {
      title.value = post.value.title
      body.value = post.value.body
      tags.value = post.value.tags
    }
  }
})

const handleSubmit = async () => {
  isSubmitting.value = true
  formError.value = null
  
  // Validate form
  if (!title.value.trim() || !body.value.trim()) {
    formError.value = 'Please fill in all required fields'
    isSubmitting.value = false
    return
  }
  
  const postData = {
    title: title.value,
    body: body.value,
    tags: tags.value || 'general'
  }
  
  try {
    let response
    
    if (props.id) {
      // Update existing post
      response = await fetch(`http://localhost:3000/posts/${props.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      })
    } else {
      // Create new post
      response = await fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      })
    }
    
    if (!response.ok) {
      throw new Error(props.id ? 'Failed to update post' : 'Failed to create post')
    }
    
    const data = await response.json()
    router.push({ name: 'postDetail', params: { id: data.id } })
  } catch (err) {
    formError.value = err.message
  } finally {
    isSubmitting.value = false
  }
}
</script>
