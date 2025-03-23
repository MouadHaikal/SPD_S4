<template>
    <div v-if="job" class="bg-gray-900 text-gray-100 p-8 rounded-lg shadow-md max-w-2xl mx-auto">
        <h1 class="text-3xl font-semibold mb-6 text-blue-400">{{ job.title }}</h1>

        <div class="mb-4">
            <h2 class="text-xl font-semibold text-gray-300 mb-2">Description</h2>
            <p class="text-gray-400 leading-relaxed">{{ job.description }}</p>
        </div>

        <div class="mb-4">
            <strong class="text-gray-300">Salary:</strong>
            <span class="text-green-400 ml-2">${{ job.salary }}</span>
        </div>

        <div class="mb-4">
            <strong class="text-gray-300">Years of Experience:</strong>
            <span class="text-gray-400 ml-2">{{ job.experience }}+</span>
        </div>

        <div class="mb-6">
            <strong class="text-gray-300">Created At:</strong>
            <span class="text-gray-400 ml-2">{{ formatDate(job.createdAt) }}</span>
        </div>

        <div class="flex justify-end">
            <router-link :to="`/jobs/${job.id}/edit`" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
                Edit Job
            </router-link>
        </div>
    </div>
    <div v-else class="text-center py-8">
        <p class="text-gray-500">Loading job details...</p>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import { RouterLink } from 'vue-router'; // Import RouterLink

    const route = useRoute();
    const jobId = route.params.id;
    const job = ref(null);

    onMounted(async () => {
        try {
            const response = await fetch(`http://localhost:3000/jobs/${jobId}`);
            if (response.ok) {
                job.value = await response.json();
            } else {
                console.error('Failed to fetch job:', response.status);
            }
        } catch (error) {
            console.error('Error fetching job:', error);
        }
    });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };
</script>
