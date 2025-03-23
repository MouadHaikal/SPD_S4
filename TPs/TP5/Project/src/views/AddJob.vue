<template>
    <div class="bg-gray-900 text-gray-100 py-8 rounded-lg shadow-md max-w-md mx-auto mt-8">
        <h1 class="text-2xl font-semibold mb-6 text-blue-400 text-center">Add New Job</h1>
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
            <div>
                <button
                    type="submit"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
                >
                    Add Job
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    const title = ref('');
    const description = ref('');
    const salary = ref('');
    const experience = ref('');
    const router = useRouter();

    const handleSubmit = async () => {
        try {
            const newJob = {
                title: title.value,
                description: description.value,
                salary: salary.value,
                experience: experience.value,
                createdAt: new Date().toISOString()
            };

            const response = await fetch('http://localhost:3000/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newJob)
            });

            if (response.ok) {
                router.push('/'); // Redirect to home after successful submission
            } else {
                console.error('Failed to add job:', response.status);
            }
        } catch (error) {
            console.error('Error adding job:', error);
        }
    };
</script>
