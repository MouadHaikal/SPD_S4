<template>
    <nav class="bg-gray-800 p-4 rounded-md shadow-md">
        <div class="container mx-auto flex items-center justify-between">

            <!-- Search Input -->
            <div class="flex items-center bg-gray-700 rounded-md px-3 py-1 focus-within:ring-2 focus-within:ring-blue-500 transition-shadow duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                </svg>
                <input type="text" placeholder="Search jobs..." class="bg-transparent text-gray-300 focus:outline-none w-full placeholder-gray-500" v-model="searchQuery">
            </div>

            <!-- (Optional) Category Filter Dropdown -->
            <select class="bg-gray-700 text-gray-300 rounded-md px-4 py-2 focus:outline-none" v-model="selectedCategory">
                <option value="">All Categories</option>
                <option value="Software">Software Development</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
            </select>

            <!-- (Optional) Location Filter Dropdown -->
            <select class="bg-gray-700 text-gray-300 rounded-md px-4 py-2 focus:outline-none" v-model="selectedLocation">
                <option value="">All Locations</option>
                <option value="Remote">Remote</option>
                <option value="NY">New York</option>
                <option value="LA">Los Angeles</option>
            </select>

        </div>
    </nav>
</template>

<script setup>
    import { ref, watch } from 'vue';

    const searchQuery = ref('');
    const selectedCategory = ref('');
    const selectedLocation = ref('');

    // Example of watching the search query (you'd emit an event or call a function here)
    watch(searchQuery, (newQuery) => {
        console.log('Search query changed:', newQuery);
        // TODO: Emit an event or call a function to filter the job list
    });

    // Example of watching the category (you'd emit an event or call a function here)
    watch(selectedCategory, (newCategory) => {
        console.log('Category selected:', newCategory);
        // TODO: Emit an event or call a function to filter the job list
    });

    // Example of watching the location (you'd emit an event or call a function here)
    watch(selectedLocation, (newLocation) => {
        console.log('Location selected:', newLocation);
        // TODO: Emit an event or call a function to filter the job list
    });
</script>
