<template>
    <div class="bg-gray-800 text-gray-200 min-h-screen">
        <header class="bg-gray-900 py-4 shadow-md">
            <div class="container mx-auto flex items-center justify-between px-4">
                <router-link to="/" class="text-2xl font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-200">Job Board</router-link>
                <nav class="space-x-4">
                    <router-link to="/" class="px-4 py-2 rounded hover:bg-gray-700 transition-colors duration-200">Home</router-link>
                    <router-link to="/add" class="px-4 py-2 rounded hover:bg-gray-700 transition-colors duration-200">Add Job</router-link>
                </nav>
            </div>
        </header>

        <main class="container mx-auto py-8 px-4">
            <router-view></router-view>
        </main>
    </div>
</template>

<script setup>
    import { RouterLink, RouterView } from 'vue-router';
</script>
