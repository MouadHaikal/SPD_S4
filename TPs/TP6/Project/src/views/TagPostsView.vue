<template>
  <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
    <div class="lg:col-span-3">
      <h1 class="text-3xl font-bold mb-6 text-indigo-400">
        Posts tagged with <span class="bg-indigo-600 px-2 py-1 rounded">{{ tag }}</span>
      </h1>
      <PostList :tag="tag" />
    </div>
    <div class="lg:col-span-1">
      <TagCloud />
    </div>
  </div>
</template>

<script setup>
import PostList from '../components/PostList.vue'
import TagCloud from '../components/TagCloud.vue'

const props = defineProps({
  tag: {
    type: String,
    required: true
  }
})
</script>
