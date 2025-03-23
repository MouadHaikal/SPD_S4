<template>
  <nav class="bg-gray-800 shadow-md">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center py-4">
        <div class="text-xl font-bold text-indigo-500">Vue Blog</div>
        <div class="space-x-4">
          <router-link 
            to="/" 
            class="text-gray-300 hover:text-white transition duration-300"
            active-class="text-white"
          >
            Home
          </router-link>
          <router-link 
            to="/create" 
            class="text-gray-300 hover:text-white transition duration-300"
            active-class="text-white"
          >
            Add Post
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
// No additional script needed
</script>
