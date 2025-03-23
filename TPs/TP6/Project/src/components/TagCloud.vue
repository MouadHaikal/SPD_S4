<template>
  <div class="bg-gray-800 p-4 rounded-lg">
    <h3 class="text-lg font-semibold mb-4 text-indigo-400">Tags</h3>
    <div v-if="loading" class="text-gray-400">Loading tags...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>
    <div v-else class="flex flex-wrap">
      <router-link 
        v-for="tag in tags" 
        :key="tag"
        :to="{ name: 'tagPosts', params: { tag } }"
        class="tag"
      >
        {{ tag }} ({{ getTagCount(tag) }})
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import getPosts from '../composables/getPosts'

const { posts, error, loading, load } = getPosts()

// Extract unique tags from all posts
const tags = computed(() => {
  if (!posts.value.length) return []
  
  const allTags = []
  posts.value.forEach(post => {
    const postTags = post.tags.split(',').map(tag => tag.trim())
    postTags.forEach(tag => {
      if (!allTags.includes(tag) && tag) {
        allTags.push(tag)
      }
    })
  })
  
  return allTags.sort()
})

// Count occurrences of each tag
const getTagCount = (tagName) => {
  return posts.value.filter(post => 
    post.tags.split(',').map(tag => tag.trim()).includes(tagName)
  ).length
}

onMounted(load)
</script>
