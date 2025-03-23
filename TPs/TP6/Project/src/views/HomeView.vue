<template>
  <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
    <div class="lg:col-span-3">
      <h1 class="text-3xl font-bold mb-6 text-indigo-400">Latest Posts</h1>
      <PostList />
    </div>
    <div class="lg:col-span-1">
      <TagCloud />
    </div>
  </div>
</template>

<script setup>
import PostList from '../components/PostList.vue'
import TagCloud from '../components/TagCloud.vue'
</script>
