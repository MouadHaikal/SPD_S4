<template>
    <div class="bg-gray-900 text-gray-100 py-8 rounded-lg shadow-md max-w-md mx-auto mt-8">
        <h1 class="text-2xl font-semibold mb-6 text-blue-400 text-center">Edit Job</h1>
        <form @submit.prevent="handleSubmit" class="space-y-6 px-4">
            <div>
                <label for="title" class="block text-gray-300 text-sm font-bold mb-2">Title:</label>
                <input
                    type="text"
                    id="title"
                    v-model="title"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 placeholder-gray-400"
                    placeholder="Enter title"
                />
            </div>
            <div>
                <label for="description" class="block text-gray-300 text-sm font-bold mb-2">Description:</label>
                <textarea
                    id="description"
                    v-model="description"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 placeholder-gray-400"
                    placeholder="Enter description"
                ></textarea>
            </div>
            <div>
                <label for="salary" class="block text-gray-300 text-sm font-bold mb-2">Salary:</label>
                <input
                    type="number"
                    id="salary"
                    v-model="salary"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 placeholder-gray-400"
                    placeholder="Enter salary"
                />
            </div>
            <div>
                <label for="experience" class="block text-gray-300 text-sm font-bold mb-2">Years of Experience:</label>
                <input
                    type="number"
                    id="experience"
                    v-model="experience"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 placeholder-gray-400"
                    placeholder="Enter years of experience"
                />
            </div>
            <div class="flex justify-between">
                <button
                    type="submit"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
                >
                    Update Job
                </button>
                <button
                    type="button"
                    @click="handleDelete"
                    class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
                >
                    Delete Job
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import { useRouter, useRoute } from 'vue-router';

    const title = ref('');
    const description = ref('');
    const salary = ref('');
    const experience = ref('');
    const router = useRouter();
    const route = useRoute();
    const jobId = route.params.id;

    onMounted(async () => {
        try {
            const response = await fetch(`http://localhost:3000/jobs/${jobId}`);
            if (response.ok) {
                const job = await response.json();
                title.value = job.title;
                description.value = job.description;
                salary.value = job.salary;
                experience.value = job.experience;
            } else {
                console.error('Failed to fetch job:', response.status);
            }
        } catch (error) {
            console.error('Error fetching job:', error);
        }
    });

    const handleSubmit = async () => {
        try {
            const updatedJob = {
                title: title.value,
                description: description.value,
                salary: salary.value,
                experience: experience.value,
                createdAt: new Date().toISOString() // Or keep the original createdAt value
            };

            const response = await fetch(`http://localhost:3000/jobs/${jobId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedJob)
            });

            if (response.ok) {
                router.push(`/jobs/${jobId}`); // Redirect to job details after successful update
            } else {
                console.error('Failed to update job:', response.status);
            }
        } catch (error) {
            console.error('Error updating job:', error);
        }
    };

    const handleDelete = async () => {
        if (confirm('Are you sure you want to delete this job?')) {
            try {
                const response = await fetch(`http://localhost:3000/jobs/${jobId}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    router.push('/'); // Redirect to home after successful deletion
                } else {
                    console.error('Failed to delete job:', response.status);
                }
            } catch (error) {
                console.error('Error deleting job:', error);
            }
        }
    };
</script>
